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
        return `Name: ${this.firstName} ${this.lastName}\nAddress: ${this.address}, ${this.city}, ${this.state} ${this.zip}\nPhone: ${this.phoneNumber}\nEmail: ${this.email}\n`;
    }
}

class AddressBook {
    constructor() {
        this.contacts = [];
    }

    addContact(contact) {
        let isDuplicate = this.contacts.some(c => 
            `${c.firstName} ${c.lastName}`.toLowerCase() === `${contact.firstName} ${contact.lastName}`.toLowerCase()
        );

        if (isDuplicate) {
            throw new Error("Duplicate entry! Contact with this name already exists.");
        }

        this.contacts.push(contact);
        console.log("Contact added successfully.");
    }

    displayContacts() {
        if (this.contacts.length === 0) {
            console.log("No contacts found.");
        } else {
            this.contacts.forEach(contact => console.log(contact.toString()));
        }
    }

    // Sorting contacts alphabetically by name
    sortContactsByName() {
        let sortedContacts = this.contacts.sort((a, b) => {
            let nameA = (a.firstName + " " + a.lastName).toLowerCase();
            let nameB = (b.firstName + " " + b.lastName).toLowerCase();
            return nameA.localeCompare(nameB);
        });

        console.log("\nContacts Sorted by Name:");
        sortedContacts.forEach(contact => console.log(contact.toString()));
    }

    // Get count of contacts by City
    countByCity(city) {
        return this.contacts.filter(contact => contact.city.toLowerCase() === city.toLowerCase()).length;
    }

    // Get count of contacts by State
    countByState(state) {
        return this.contacts.filter(contact => contact.state.toLowerCase() === state.toLowerCase()).length;
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

    console.log("\nAll Contacts:");
    addressBook.displayContacts();

    // Sort and display contacts
    addressBook.sortContactsByName();

    // Count contacts by City and State
    console.log(`\nNumber of contacts in Delhi: ${addressBook.countByCity("Delhi")}`);
    console.log(`Number of contacts in UP: ${addressBook.countByState("UP")}`);

} catch (error) {
    console.error(error.message);
}
