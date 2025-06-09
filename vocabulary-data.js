// Vocabulary data organized by categories
const vocabularyData = {
    'course-types': [
        {
            word: 'Appetizer',
            definition: 'A small dish served before the main course to stimulate appetite',
            example: 'We ordered calamari rings as an appetizer.',
            audioFile: 'appetizer.mp3'
        },
        {
            word: 'Side Dish',
            definition: 'A food item served alongside the main course',
            example: 'The steak comes with a choice of side dish.',
            audioFile: 'side-dish.mp3'
        },
        {
            word: 'Main Course',
            definition: 'The primary dish of a meal, usually the largest portion',
            example: 'For my main course, I\'ll have the grilled salmon.',
            audioFile: 'main-course.mp3'
        },
        {
            word: 'Entrée',
            definition: 'Another term for the main course in American dining',
            example: 'All entrées include soup or salad.',
            audioFile: 'entree.mp3'
        },
        {
            word: 'Dessert',
            definition: 'A sweet course served at the end of a meal',
            example: 'Would you like to see our dessert menu?',
            audioFile: 'dessert.mp3'
        },
        {
            word: 'Beverage',
            definition: 'Any drink, including water, soft drinks, coffee, tea, or alcohol',
            example: 'What beverage would you like with your meal?',
            audioFile: 'beverage.mp3'
        }
    ],
    'menu-labels': [
        {
            word: 'Vegetarian',
            definition: 'Food that contains no meat, poultry, or fish',
            example: 'Do you have any vegetarian options?',
            audioFile: 'vegetarian.mp3'
        },
        {
            word: 'Vegan',
            definition: 'Food that contains no animal products whatsoever',
            example: 'This salad is completely vegan.',
            audioFile: 'vegan.mp3'
        },
        {
            word: 'Gluten-Free',
            definition: 'Food that does not contain gluten, a protein found in wheat',
            example: 'We offer gluten-free pasta options.',
            audioFile: 'gluten-free.mp3'
        },
        {
            word: 'Dairy-Free',
            definition: 'Food that contains no milk or milk products',
            example: 'This dessert is dairy-free.',
            audioFile: 'dairy-free.mp3'
        },
        {
            word: 'Spicy',
            definition: 'Food that has a hot, peppery taste',
            example: 'How spicy is this dish on a scale of 1 to 10?',
            audioFile: 'spicy.mp3'
        },
        {
            word: 'Allergy Alert',
            definition: 'A warning about potential allergens in food',
            example: 'Please check the allergy alert before ordering.',
            audioFile: 'allergy-alert.mp3'
        }
    ],
    'pricing': [
        {
            word: 'Chef\'s Special',
            definition: 'A featured dish recommended by the chef',
            example: 'Tonight\'s chef\'s special is lobster risotto.',
            audioFile: 'chefs-special.mp3'
        },
        {
            word: 'Set Menu',
            definition: 'A fixed menu with predetermined courses at a set price',
            example: 'We offer a three-course set menu for $35.',
            audioFile: 'set-menu.mp3'
        },
        {
            word: 'Prix Fixe',
            definition: 'A menu offering several courses for a fixed total price',
            example: 'The prix fixe menu includes appetizer, main, and dessert.',
            audioFile: 'prix-fixe.mp3'
        },
        {
            word: 'À la Carte',
            definition: 'Ordering individual dishes separately, each with its own price',
            example: 'You can order à la carte or choose the set menu.',
            audioFile: 'a-la-carte.mp3'
        },
        {
            word: 'Market Price',
            definition: 'Price that varies based on current market conditions',
            example: 'Today\'s fish is market price.',
            audioFile: 'market-price.mp3'
        },
        {
            word: 'Happy Hour',
            definition: 'A time period with discounted drinks and appetizers',
            example: 'Happy hour is from 4 to 6 PM daily.',
            audioFile: 'happy-hour.mp3'
        }
    ],
    'portions': [
        {
            word: 'Small Portion',
            definition: 'A smaller serving size, often for lighter appetites',
            example: 'Can I get a small portion of the pasta?',
            audioFile: 'small-portion.mp3'
        },
        {
            word: 'Large Portion',
            definition: 'A bigger serving size for hearty appetites',
            example: 'The large portion is perfect for sharing.',
            audioFile: 'large-portion.mp3'
        },
        {
            word: 'Family-Style',
            definition: 'Large portions meant to be shared among multiple people',
            example: 'We serve our pasta family-style.',
            audioFile: 'family-style.mp3'
        },
        {
            word: 'Combo',
            definition: 'A combination meal that includes multiple items',
            example: 'The burger combo comes with fries and a drink.',
            audioFile: 'combo.mp3'
        },
        {
            word: 'Add-On',
            definition: 'An extra item that can be added to your order',
            example: 'Would you like to add bacon as an add-on?',
            audioFile: 'add-on.mp3'
        },
        {
            word: 'Substitute',
            definition: 'To replace one item with another',
            example: 'Can I substitute the fries for a salad?',
            audioFile: 'substitute.mp3'
        }
    ],
    'service': [
        {
            word: 'Table Service',
            definition: 'Service where waitstaff take orders and serve food at your table',
            example: 'This restaurant offers full table service.',
            audioFile: 'table-service.mp3'
        },
        {
            word: 'Buffet',
            definition: 'Self-service dining where you serve yourself from a variety of dishes',
            example: 'The Sunday brunch buffet has over 50 items.',
            audioFile: 'buffet.mp3'
        },
        {
            word: 'Food Court',
            definition: 'An area with multiple food vendors, typically in a mall',
            example: 'Let\'s meet at the food court for lunch.',
            audioFile: 'food-court.mp3'
        },
        {
            word: 'Drive-Through',
            definition: 'Service that allows you to order and receive food without leaving your car',
            example: 'The drive-through is open 24 hours.',
            audioFile: 'drive-through.mp3'
        },
        {
            word: 'Take-Out',
            definition: 'Food ordered to be eaten elsewhere, not in the restaurant',
            example: 'Is this for dine-in or take-out?',
            audioFile: 'take-out.mp3'
        }
    ]
};

// Export for use in other scripts
if (typeof module !== 'undefined' && module.exports) {
    module.exports = vocabularyData;
}

