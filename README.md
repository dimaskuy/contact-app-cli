![Node](https://img.shields.io/badge/node-22.x-green?logo=node.js)
![CLI](https://img.shields.io/badge/CLI-Terminal-informational?logo=gnubash)
![JSON Database](https://img.shields.io/badge/JSON-Storage-yellow?logo=json)
![yargs](https://img.shields.io/badge/yargs-CLI--Parser-red)
![chalk](https://img.shields.io/badge/chalk-TerminalColors-blueviolet)
![validator](https://img.shields.io/badge/validator-InputValidation-blue)

# A Simple Contact App with CLI-based.

> In-powered by Node.js, ES Modules, and some amazing tools to help the development like `chalk`, `yargs`, also a `validator`.

## 🌟 Features

-   Add a new contact via CLI prompt and/or command arguments
-   Validates phone numbers & email in Indonesia-region
-   Prevents duplicate names or phone numbers
-   Stores data in a local JSON file
-   View all saved contacts
-   View contact details by phone number
-   Delete contact by phone number
-   Interactive CLI mode available (just run `node app`)

## 📦 Installation

1. Cloning the repo:

```
git clone https://github.com/dimaskuy/contact-app-cli.git
cd simple-contact-cli
```

2. Install (or overwrite) this dependencies:

```
npm install
```

3. Run the app!

```
node app
```

## 💭 How to Use?

**🅰️ Add Contact Manually**

```
node app
```

and you'll be prompted to enter following data:

1. Name (_required_)
2. Phone number (_required_, must be valid ID format)
3. Email (_optional_, but if do, must be valid email address)
4. Hobby (_optional_, one of them)

to cancel filling the data, you can press `CTRL+C` in keyboard.

**🅱️ Directing command**

Like the following this example arguments:

```
node app add --name="yourname" --telp="08123456789" --email="yours@email.com" --hobby="Coding"
```

again, email and hobby are optionals.

---

Further usage:

**👁️ Show All Contacts**

```
node app show
```

**🔎 Find The Contact's Details (by Phone Number)**

Input your phone number that you wanna see the details. Like an example:

```
node app detail --telp="08123456789"
```

**❌ Remove Contact (by Phone Number)**

Just like how you can find the contact details. An example:

```
node app remove --telp="08123456789"
```

## 📂 Folder Structure

```
.
├── data/
│   └── contacts.json  # JSON-based database
├── app.js             # Main & CLI commands
├── contact.js         # Core logic: input, validation, CRUD
├── package.json       # Metadata & Dependencies
```

## ✍️ Built with

-   Node.js (ES Modules)
-   [`yargs`](https://www.npmjs.com/package/yargs) – CLI argument parser
-   [`chalk`](https://www.npmjs.com/package/chalk) – terminal styling
-   [`validator`](https://www.npmjs.com/package/validator) – email & phone validation

Also thanks to [Sandhika Galih](https://www.youtube.com/@sandhikagalihWPU) for the tutorials!

---
