const categories = [
  {
    name: "Income",
    subCategories: [
      "Weekly", 
      "Bi-Weekly", 
      "Monthly", 
      "One Time"
    ]
  },{
    name: "Mortgage/Rent",
    minPercent: 25,
    maxPercent: 35,
    startPercent: 25,
    subCategories: [
      "1st Mortgage",
      "2nd Mortgage",
      "Rent",
      "Repairs/Maint.",
      "Real Estate Taxes",
      "Association Dues"
    ]
  },{
    name: "Utilities",
    minPercent: 5,
    maxPercent: 10,
    startPercent: 5,
    subCategories: [
      "Electricity",
      "Gas",
      "Water",
      "Trash",
      "Phone(s)",
      "Internet",
      "TV Package",
      "Sling",
      "Netflix",
      "Amazon Prime",
      "Hulu",
      "Disney"
    ]
  },{
    name: "Insurance",
    minPercent: 10,
    maxPercent: 25,
    startPercent: 10,
    subCategories: [
      "Life",
      "Health",
      "Car",
      "Home Owners/Renters",
      "Disability",
      "Long-Term Care"
    ]
  },{
    name: "Giving",
    minPercent: 10,
    maxPercent: 15,
    startPercent: 10,
    subCategories: [
      "Tithes",
      "Charity"
    ]
  },{
    name: "Transportation",
    minPercent: 10,
    maxPercent: 15,
    startPercent: 10,
    subCategories: [
      "Gas & Oil",
      "Repairs & Tires",
      "License & Taxes",
      "Bus/Train Passes"
    ]
  },{
    name: "Debt",
    minPercent: 5,
    maxPercent: 10,
    startPercent: 5,
    subCategories: [
      "Credit Card",
      "Car Payment",
      "Student Loan"
    ]
  },{
    name: "Food",
    minPercent: 5,
    maxPercent: 15,
    startPercent: 10,
    subCategories: [
      "Groceries",
      "Resturants/Takeout"
    ]
  },{
    name: "Medical/Health",
    minPercent: 5,
    maxPercent: 10,
    startPercent: 5,
    subCategories: [
      "Medications",
      "Doctors Bills",
      "Dentist",
      "Optometrist",
      "Vitamins"
    ]
  },{
    name: "Personal",
    minPercent: 5,
    maxPercent: 10,
    startPercent: 5,
    subCategories: [
      "Child Care/Sitter",
      "Toiletries",
      "Cosmetics/Hair Care",
      "Education/Tuition",
      "Books/Supplies",
      "Child Support",
      "Alimony",
      "Subscriptions",
      "Organization Dues",
      "Pocket Money",
      "Baby Supplies",
      "Pet Supplies",
      "Music/Technology",
      "Misculaneous"
    ]
  },{
    name: "Recreation",
    minPercent: 5,
    maxPercent: 10,
    startPercent: 5,
    subCategories: [
      "Gym Membership",
      "Entertainment",
      "Trainer",
      "Sport Dues"
    ]
  },{
    name: "Savings",
    minPercent: 5,
    maxPercent: 10,
    startPercent: 5,
    subCategories: [
      "Vacation",
      "Christmas",
      "Birthdays",
      "Retirement",
      "Emergency Fund"
    ]
  },{
    name: "Clothing",
    minPercent: 2,
    maxPercent: 7,
    startPercent: 5,
    subCategories: [
      "Adults", 
      "Children", 
      "Cleaning/Laundry"]
  }
];
  module.exports = categories