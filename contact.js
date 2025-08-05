import fs from "fs";
import readline from "readline";
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});
import chalk from "chalk";
import validator from "validator";
import { app, isSpecialCommand } from "./app.js";

// fs.exists: mengecek apakah path/folder dituju ada atau tidak
// membuat path data jika belum ada
const pathDir = "./data";
const pathData = "./data/contacts.json";
const checkPath = (path) => (fs.existsSync(path) ? `${path} is already exist.` : fs.mkdirSync(path));
checkPath(pathDir);
// membuat file JSON dalam path jika belum ada
const checkPathFile = (file) => (fs.existsSync(file) ? `${file} is already exist.` : fs.writeFileSync(file, "[]", "utf-8"));
checkPathFile(pathData);

// FUNCTION PERTANYAAN
// mengatasi callback hell (ketika kode kita semakin menjorok ke dalam)
// dengan async await, namun kita juga harus mengubah kode kita pakai Promise
const question = (quest) => {
    return new Promise((resolve, reject) => {
        rl.question(`${quest}: `, (result) => {
            resolve(result); // apa yg dilakukan jika Promise berhasil
        });
    });
};
const thankLog = chalk.italic.yellowBright("==Thank You!==");

const specialCommandErr = (msg, endMsg) => {
    msg.length > 0 && console.error(`${chalk.bold.red(msg)} ${endMsg ? chalk.redBright(endMsg) : ""}`);
    if (isSpecialCommand) {
        rl.close();
        return false;
    }
    return app();
};

const duplicateCheck = (datas, data) => {
    const duplicateName = datas.find((dat) => dat.name === data.name);
    const duplicateTelp = datas.find((dat) => dat.telp === data.telp);
    if (duplicateName) {
        return specialCommandErr("*Nama orang sudah terdaftar,", "gunakan nama lain!");
    }
    if (duplicateTelp) {
        return specialCommandErr("*No telepon sudah terdaftar,", "gunakan nomor lain!");
    }
};

const loadData = () => {
    const bufferFile = fs.readFileSync(pathData, "utf-8");
    const datas = JSON.parse(bufferFile);
    return datas;
};

// BASE
const contactSystem = ({ ...dataArgs }) => {
    const data = dataArgs;
    console.log(chalk.italic.black.bgBlackBright("memeroses...\n"));

    const datas = loadData();

    // cek duplikat
    const duplicateName = datas.find((dat) => dat.name === data.name);
    const duplicateTelp = datas.find((dat) => dat.telp === data.telp);
    if (duplicateName) {
        return specialCommandErr("*Nama orang sudah terdaftar,", "gunakan nama lain!");
    }
    if (duplicateTelp) {
        return specialCommandErr("*No telepon sudah terdaftar,", "gunakan nomor lain!");
    }

    // cek validator
    const isValidIndoPhone = (num) => validator.isMobilePhone(num, "id-ID", true) || /^08[1-9][0-9]{7,10}$/.test(num);
    const isEmail = validator.isEmail(data.email);

    if (!isValidIndoPhone(data.telp)) {
        return specialCommandErr("*No HP/WA tidak valid!", "Coba lagi.");
    }
    if (data.email && data.email !== "-") {
        if (!isEmail) {
            return specialCommandErr("*Email tidak valid!", "Coba lagi.");
        }
    }

    datas.push(data);

    fs.writeFileSync(pathData, JSON.stringify(datas));
    console.log(chalk.bgGreen("Data telah ditambahkan ke " + pathData), datas);

    if (!isSpecialCommand) {
        rl.question("Repeat? (Y/N) ", (answer) => {
            if (answer === "Y" || answer === "y") {
                app();
            } else {
                console.log(thankLog);
                rl.close();
            }
        });
    } else {
        console.log(thankLog);
        rl.close();
    }
};

// SHOW LIST
const showAvailable = (data, i = null) => {
    const checkAvailable = (data, prop) => {
        const target = data[prop];
        return `${chalk.cyan(prop)}: ${target === "-" || null ? `${chalk.italic.gray("[unknown]")}` : target}`;
    };

    return `${chalk.gray("--------")}${i ? i + 1 : ""}\n${chalk.cyan("nama")}: ${data.name}, \n${chalk.cyan("telepon")}: ${data.telp}\n${checkAvailable(data, "email")}\n${checkAvailable(data, "hobby")}`;
};
const listContact = () => {
    const datas = loadData();
    console.log(chalk.bold.bgCyan("\n==DATA CONTACTS LIST=="));

    datas.map((data, i) => {
        console.log(showAvailable(data, i));
    });
    rl.close();
};

// DETAIL [TELP]
const detailContact = (prop) => {
    const datas = loadData();

    const data = datas.find((dat) => dat.telp === prop);
    if (!data) {
        return specialCommandErr(`${prop} tidak ditemukan.`);
    }
    // specialCommandErr(`${prop} tidak ditemukan.`);
    console.log(chalk.italic.black.bgBlackBright("Berhasil menemukan!\n"), showAvailable(data));
    rl.close();
    // TEST: node app detail --telp="081252932"
};

// REMOVE [TELP]
const deleteContact = (prop) => {
    const datas = loadData(); // array lama
    // dengan diganti array baru, karena suatu element array dihapus akan "undefined"
    const newData = datas.filter((dat) => dat.telp !== prop); // array baru

    if (datas.length === newData.length) {
        // jika jmlh element data lama & baru sama, berarti data tdk ditemukan
        return specialCommandErr(`Nomor ${prop} tidak ditemukan!`);
    }
    // jika berhasil ditemukan = ganti data ke newData
    fs.writeFileSync(pathData, JSON.stringify(newData));
    console.log(chalk.bgRedBright(`Data kontak dari nomor ${prop} berhasil dihapus!`), newData);
    rl.close();

    // TEST: node app remove --telp="081252932"
};

// EXPORTING MODULES
export { question, contactSystem, listContact, detailContact, deleteContact };
