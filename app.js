// SIMPLE CONTACT APP | cek juga di contact.js | menggunakan ES6 modules
import { question, contactSystem, listContact, detailContact, deleteContact } from "./contact.js";
import chalk from "chalk";

// mengambil argument dari command line, misal "node app [argument]"
// console.log(process.argv); // (mulai element array ke-2)
// terdapat package npm untuk membuat command line interaktif: 'yargs'
import yargs from "yargs";
import { hideBin } from "yargs/helpers";
const argv = yargs(hideBin(process.argv)).parse();
const isSpecialCommand = argv._.length > 0;

const checkUnfill = (quest) => (!quest || quest === "" ? "-" : quest);

// BASIC (node app)
const app = async () => {
    console.log(chalk.bold.bgCyan("\n==DATA INPUT=="));
    console.log(chalk.cyan("CTRL+C untuk batalkan."));
    isSpecialCommand && console.log("\nfor help: node app --help");
    console.log(`Pada ${chalk.yellow("email")} dan ${chalk.yellow("hobby")} jika tidak ada, ketik ${chalk.yellow('"-"')}`);

    const name = await question("Nama");
    const telp = await question("Nomor HP");
    const email = checkUnfill(await question("Email " + chalk.gray("[opsional]")));
    const hobby = checkUnfill(await question("Hobby " + chalk.gray("[opsional]")));

    contactSystem({ name, telp, email, hobby });
};

// SPECIAL COMMAND (add, remove)
yargs(hideBin(process.argv))
    .command({
        // command({command, describe, builder, handler()})
        command: "add",
        describe: "Tambah data kontak baru.",
        builder: {
            name: {
                describe: "Nama orang.",
                demandOption: true, // wajib diisi/tidak?
                type: "string",
            },
            telp: {
                describe: "Phone/WhatsApp number.",
                demandOption: true,
                type: "string",
            },
            email: {
                describe: "person@email.address",
                demandOption: false,
                default: "-", // nilai default
                type: "string",
            },
            hobby: {
                describe: "Satu hobi favorit.",
                demandOption: false,
                default: "-",
                type: "string",
            },
        },
        handler(argv) {
            contactSystem({
                name: argv.name,
                telp: argv.telp,
                email: argv.email,
                hobby: argv.hobby,
            });
        },
        // TEST: node app add --name="dimas" --telp="081252932" --email="di@g.co" --hobby="reading"
        // TEST: node app add --name="dimass" --telp="081252932"
    })
    // .demandOption([`name ${chalk.red("[wajib]")}`, `telp ${chalk.red("[wajib]")}`, `email ${chalk.gray("[opsional]")}`, `hobby ${chalk.gray("[opsional]")}`], "Butuh setidaknya 2 parameter, nama dan nomor telepon.")
    .parse();

yargs(hideBin(process.argv))
    .command({
        // command({command, describe, builder, handler()})
        command: "remove",
        describe: "Menghapus kontak berdasarkan nomor telepon.",
        builder: {
            telp: {
                describe: "Nomor telepon/WA.",
                demandOption: true, // wajib diisi/tidak?
                type: "string",
            },
        },
        handler(argv) {
            deleteContact(argv.telp);
        },
    })
    // .demandOption([`name ${chalk.red("[wajib]")}`, `telp ${chalk.red("[wajib]")}`, `email ${chalk.gray("[opsional]")}`, `hobby ${chalk.gray("[opsional]")}`], "Butuh setidaknya 2 parameter, nama dan nomor telepon.")
    .parse();

// menampilkan seluruh daftar contact
yargs(hideBin(process.argv))
    .command({
        command: "show",
        describe: "Tampilkan seluruh kontak tersedia.",
        handler() {
            listContact();
        },
    })
    .parse();

// menampilkan seluruh daftar contact sesuai telp
yargs(hideBin(process.argv))
    .command({
        command: "detail",
        describe: "Tampilkan kontak sesuai nomor telepon.",
        handler(argv) {
            detailContact(argv.telp);
        },
    })
    // .demandOption("telp", 'Butuh setidaknya parameter nama (--telp="...")')
    .parse();

!isSpecialCommand && app();

export { app, isSpecialCommand };
