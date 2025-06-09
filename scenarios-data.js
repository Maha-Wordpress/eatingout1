// Scenarios data based on the worksheet
const scenariosData = [
    {
        id: 1,
        title: "Ordering for Your Child",
        description: "You are ordering for your child. What would you do?",
        cues: ["kids' menu", "small portion", "combo"],
        options: [
            "Ask for the regular adult menu",
            "Look for the kids' menu and ask about small portions",
            "Order the spiciest dish available",
            "Request extra large portions"
        ],
        correct: 1,
        explanation: "When ordering for children, it's best to look for the kids' menu which typically offers smaller portions and child-friendly options, often in combo format."
    },
    {
        id: 2,
        title: "Spicy Dishes and Allergies",
        description: "The menu has a symbol next to spicy dishes. What would you do?",
        cues: ["spicy", "allergy alert", "substitute"],
        options: [
            "Ignore the symbols completely",
            "Ask the server about the spice level and request substitutions if needed",
            "Order the spiciest dish without asking",
            "Leave the restaurant immediately"
        ],
        correct: 1,
        explanation: "Menu symbols are important safety information. Always ask about spice levels and allergens, and request substitutions if you have dietary restrictions."
    },
    {
        id: 3,
        title: "Gluten and Dairy Allergies",
        description: "You're allergic to gluten and dairy. What would you do?",
        cues: ["gluten-free", "dairy-free", "allergy alert"],
        options: [
            "Order anything without mentioning your allergies",
            "Inform the server about your allergies and ask for gluten-free, dairy-free options",
            "Only drink water",
            "Bring your own food"
        ],
        correct: 1,
        explanation: "Always inform restaurant staff about serious allergies. Most restaurants can accommodate gluten-free and dairy-free requests with proper notice."
    },
    {
        id: 4,
        title: "À la Carte vs Prix Fixe",
        description: "You are trying to decide between à la carte and prix fixe. What would you do?",
        cues: ["à la carte", "prix fixe", "set menu"],
        options: [
            "Choose based on your appetite and budget preferences",
            "Always choose the most expensive option",
            "Flip a coin to decide",
            "Ask for a completely different menu"
        ],
        correct: 0,
        explanation: "À la carte allows you to order individual items, while prix fixe offers a set menu at a fixed price. Choose based on your appetite, preferences, and budget."
    },
    {
        id: 5,
        title: "Happy Hour Timing",
        description: "You see a sign that says 'Happy Hour – 4 to 6 PM'. What would you do?",
        cues: ["happy hour", "limited time", "beverage", "appetizer"],
        options: [
            "Come back at 8 PM for happy hour",
            "Take advantage of discounted drinks and appetizers during the specified time",
            "Ask them to extend happy hour for you",
            "Ignore the sign completely"
        ],
        correct: 1,
        explanation: "Happy hour offers discounted beverages and appetizers during specific times. Take advantage of these deals during the posted hours."
    },
    {
        id: 6,
        title: "Spice Level Preferences",
        description: "You want a hot meal, but not too spicy. How do you ask the server?",
        cues: ["spicy", "substitute", "main course"],
        options: [
            "Order the spiciest dish on the menu",
            "Ask about spice levels and request mild to medium heat",
            "Order only cold dishes",
            "Don't mention your preference"
        ],
        correct: 1,
        explanation: "Communicate your spice preferences clearly. Ask about heat levels and request modifications to suit your taste."
    },
    {
        id: 7,
        title: "Explaining Buffet Service",
        description: "You're at a buffet. Your friend asks: 'How does it work?' What do you say?",
        cues: ["buffet", "table service", "side dish"],
        options: [
            "You order from a menu like normal",
            "You serve yourself from the food stations and pay a fixed price",
            "The chef comes to your table",
            "You can only order drinks"
        ],
        correct: 1,
        explanation: "At a buffet, customers serve themselves from various food stations and typically pay a fixed price for unlimited access to the food."
    },
    {
        id: 8,
        title: "Creating a Healthy Menu",
        description: "You are creating a new healthy menu. What labels or flags will you include?",
        cues: ["vegetarian", "vegan", "gluten-free", "seasonal"],
        options: [
            "No labels needed",
            "Include dietary labels like vegetarian, vegan, gluten-free, and seasonal indicators",
            "Only price labels",
            "Only spicy indicators"
        ],
        correct: 1,
        explanation: "Healthy menus should clearly indicate dietary options like vegetarian, vegan, gluten-free items, and highlight seasonal, fresh ingredients."
    },
    {
        id: 9,
        title: "End of Meal Options",
        description: "You just finished your main course. What can you ask for to end the meal?",
        cues: ["dessert", "beverage", "add-on"],
        options: [
            "Another main course",
            "Dessert, coffee, or after-dinner beverages",
            "More appetizers",
            "The check immediately"
        ],
        correct: 1,
        explanation: "After the main course, you can order dessert, coffee, tea, or other after-dinner beverages to complete your meal."
    },
    {
        id: 10,
        title: "Portion Size Options",
        description: "You don't want a full-size portion. What size options can you ask about?",
        cues: ["small", "large", "half portion"],
        options: [
            "Only full portions are available",
            "Ask about small, half portions, or appetizer-sized servings",
            "Order multiple full portions",
            "Share with the entire restaurant"
        ],
        correct: 1,
        explanation: "Many restaurants offer small portions, half portions, or appetizer-sized servings for those who want lighter meals."
    },
    {
        id: 11,
        title: "Combo Meal Identification",
        description: "Your meal includes a drink, salad, and sandwich. What is this type of item called?",
        cues: ["combo", "side dish", "beverage"],
        options: [
            "À la carte",
            "A combo or set meal",
            "Prix fixe",
            "Buffet style"
        ],
        correct: 1,
        explanation: "When multiple items are bundled together (like a drink, salad, and sandwich), this is called a combo or set meal."
    }
];

// Export for use in other scripts
if (typeof module !== 'undefined' && module.exports) {
    module.exports = scenariosData;
}

