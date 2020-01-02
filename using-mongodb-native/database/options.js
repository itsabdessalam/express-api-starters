module.exports = {
  users: {
    validator: {
      $jsonSchema: {
        bsonType: "object",
        required: [
          "firstName",
          "lastName",
          "phones",
          "address.number",
          "address.street",
          "address.zipCode",
          "address.city"
        ],
        properties: {
          firstName: {
            bsonType: "string",
            description: "Firstname. Required."
          },
          lastName: {
            bsonType: "string",
            description: "Lastname. Required."
          },
          phones: {
            type: "array",
            description: "User's phones. Required.",
            items: {
              bsonType: "object",
              required: ["label", "value"],
              properties: {
                label: {
                  bsonType: "string",
                  description: "Label. Required."
                },
                value: {
                  bsonType: "string",
                  description: "Phone number. Required."
                }
              }
            }
          },
          "address.number": {
            bsonType: "number",
            description: "Address number"
          },
          "address.street": {
            bsonType: "string",
            description: "Address street"
          },
          "address.zipCode": {
            bsonType: "string",
            description: "Zipcode"
          },
          "address.city": {
            bsonType: "string",
            description: "City"
          }
        }
      }
    }
  }
};
