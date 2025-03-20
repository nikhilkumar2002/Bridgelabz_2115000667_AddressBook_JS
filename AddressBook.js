class Contact {
    constructor(firstName, lastName, address, city, state, zip, phoneNumber, email) {
        this.validateName(firstName, "First Name");
        this.validateName(lastName, "Last Name");
        this.validateAddress(address, "Address");
        this.validateAddress(city, "City");
        this.validateAddress(state, "State");
        this.validateZip(zip);
        this.validatePhoneNumber(phoneNumber);
        this.validateEmail(email);

        this.firstName = firstName;
        this.lastName = lastName;
        this.address = address;
        this.city = city;
        this.state = state;
        this.zip = zip;
        this.phoneNumber = phoneNumber;
        this.email = email;
    }

    validateName(name, fieldName) {
        const nameRegex = /^[A-Z][a-zA-Z]{2,}$/;
        if (!nameRegex.test(name)) {
            throw new Error(`${fieldName} must start with a capital letter and have at least 3 characters.`);
        }
    }

    validateAddress(value, fieldName) {
        if (value.length < 2) {
            throw new Error(`${fieldName} must have at least 4 characters.`);
        }
    }

    validateZip(zip) {
        const zipRegex = /^[1-9][0-9]{5}$/;
        if (!zipRegex.test(zip)) {
            throw new Error(`Zip code must be a 6-digit number and not start with 0.`);
        }
    }

    validatePhoneNumber(phone) {
        const phoneRegex = /^[6-9][0-9]{9}$/;
        if (!phoneRegex.test(phone)) {
            throw new Error(`Phone number must be a valid 10-digit number starting with 6-9.`);
        }
    }

    validateEmail(email) {
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (!emailRegex.test(email)) {
            throw new Error(`Invalid email format.`);
        }
    }

    toString() {
        return `Name: ${this.firstName} ${this.lastName}\nAddress: ${this.address}, ${this.city}, ${this.state} ${this.zip}\nPhone: ${this.phoneNumber}\nEmail: ${this.email}`;
    }
}

class AddressBook {
    constructor() {
        this.contacts = [];
    }

    addContact(contact) {
        let isDuplicate = this.contacts.some(
            c => `${c.firstName} ${c.lastName}`.toLowerCase() === `${contact.firstName} ${contact.lastName}`.toLowerCase()
        );

        if (isDuplicate) {
            throw new Error("Duplicate entry! Contact with this name already exists.");
        }

        this.contacts.push(contact);
        console.log("Contact added successfully.");
    }

    findContact(name) {
        return this.contacts.find(contact => `${contact.firstName} ${contact.lastName}`.toLowerCase() === name.toLowerCase());
    }

    deleteContact(name) {
        let index = this.contacts.findIndex(contact => `${contact.firstName} ${contact.lastName}`.toLowerCase() === name.toLowerCase());
        if (index === -1) {
            console.log("Contact not found.");
            return;
        }
        this.contacts.splice(index, 1);
        console.log("Contact deleted successfully.");
    }

    getContactCount() {
        return this.contacts.length;
    }

    displayContacts() {
        if (this.contacts.length === 0) {
            console.log("No contacts found.");
        } else {
            this.contacts.forEach(contact => console.log(contact.toString() + "\n"));
        }
    }

    /** Group contacts by City */
    groupByCity() {
        return this.contacts.reduce((grouped, contact) => {
            grouped[contact.city] = grouped[contact.city] || [];
            grouped[contact.city].push(`${contact.firstName} ${contact.lastName}`);
            return grouped;
        }, {});
    }

    /** Group contacts by State */
    groupByState() {
        return this.contacts.reduce((grouped, contact) => {
            grouped[contact.state] = grouped[contact.state] || [];
            grouped[contact.state].push(`${contact.firstName} ${contact.lastName}`);
            return grouped;
        }, {});
    }

    /** Count number of contacts by City */
    countByCity() {
        return this.contacts.reduce((count, contact) => {
            count[contact.city] = (count[contact.city] || 0) + 1;
            return count;
        }, {});
    }

    /** Count number of contacts by State */
    countByState() {
        return this.contacts.reduce((count, contact) => {
            count[contact.state] = (count[contact.state] || 0) + 1;
            return count;
        }, {});
    }
}

// Example Usage
try {
    let addressBook = new AddressBook();

    let contact1 = new Contact("Nikhil", "Kumar", "BHEL Jhansi", "Jhansi", "UP", "284120", "9876543210", "nikhil.kumar@gmail.com");
    let contact2 = new Contact("Amit", "Sharma", "Delhi NCR", "Delhi", "DL", "110001", "9123456789", "amit.sharma@gmail.com");
    let contact3 = new Contact("Rahul", "Verma", "MG Road", "Delhi", "DL", "110002", "9345678901", "rahul.verma@gmail.com");
    let contact4 = new Contact("Sita", "Gupta", "Varanasi", "Varanasi", "UP", "221002", "9876541230", "sita.gupta@gmail.com");
    let contact5 = new Contact("Mohan", "Yadav", "Lucknow", "Lucknow", "UP", "226001", "8765432109", "mohan.yadav@gmail.com");

    addressBook.addContact(contact1);
    addressBook.addContact(contact2);
    addressBook.addContact(contact3);
    addressBook.addContact(contact4);
    addressBook.addContact(contact5);

    console.log("All Contacts:");
    addressBook.displayContacts();

    // Count by City
    console.log("\nCount of Contacts by City:");
    console.log(addressBook.countByCity());

    // Count by State
    console.log("\nCount of Contacts by State:");
    console.log(addressBook.countByState());

} catch (error) {
    console.error(error.message);
}
