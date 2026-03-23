const mongoose = require('mongoose');
const Menu = require('./models/Menu');
require('dotenv').config();

const menuItems = [
    // Breakfast
    {
        name: {
            en: 'Kiribath with Lunu Miris',
            si: 'ලුණු මිරිස් සමඟ කිරි බත්',
            ta: 'கிரிபத் உடன் லினு மிரிஸ்'
        },
        description: {
            en: 'Traditional Sri Lankan Milk Rice with spicy onion relish',
            si: 'ලුණු මිරිස් සහ සම්බෝල සමඟ පිළිගන්වන සාම්ප්‍රදායික ශ්‍රී ලංකා කිරි බත්',
            ta: 'பாரம்பரிய இலங்கை பால் சோறு காரமான வெங்காய சட்னியுடன்'
        },
        price: 150,
        category: 'Breakfast',
        isVeg: true,
        image: 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&q=80&w=800',
        availableDays: ['Monday', 'Wednesday', 'Friday', 'Sunday']
    },
    {
        name: {
            en: 'Egg Hoppers',
            si: 'බිත්තර ආප්ප',
            ta: 'முட்டை அப்பம்'
        },
        description: {
            en: 'Crispy rice flour crepes with a soft egg center',
            si: 'මැද බිත්තරයක් අඩංගු කරපටිය හැඩැති සහල් පිටි ආප්ප',
            ta: 'மென்மையான முட்டை மையத்துடன் கூடிய மிருதுவான அரிசி மாவு அப்பம்'
        },
        price: 120,
        category: 'Breakfast',
        isVeg: false,
        image: 'https://images.unsplash.com/photo-1606491956391-70868b5d0f47?auto=format&fit=crop&q=80&w=800',
        availableDays: ['Tuesday', 'Thursday', 'Saturday']
    },
    {
        name: {
            en: 'Pol Sambol & Roast Paan',
            si: 'පොල් සම්බෝල සහ රෝස්ට් පාන්',
            ta: 'தேங்காய் சம்பல் & வறுத்த ரொட்டி'
        },
        description: {
            en: 'Coconut sambol with wood-fired roasted bread',
            si: 'පොල් සම්බෝල සහ පෝරණුවෙන් පුළුස්සා ගත් රෝස්ට් පාන්',
            ta: 'விறகு அடுப்பில் வறுத்த ரொட்டியுடன் தேங்காய் சம்பல்'
        },
        price: 100,
        category: 'Breakfast',
        isVeg: true,
        image: 'https://images.unsplash.com/photo-1505575967455-40e256f73376?auto=format&fit=crop&q=80&w=800',
        availableDays: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
    },

    // Lunch
    {
        name: {
            en: 'Rice and Curry (Veg)',
            si: 'බත් සහ වෑංජන (නිර්මාංශ)',
            ta: 'சோறு மற்றும் கறி (சைவம்)'
        },
        description: {
            en: 'Classic Sri Lankan veg meal with 5 seasonal curries',
            si: 'එළවළු වෑංජන 5ක් සමඟ සාම්ප්‍රදායික බත් කෑමක්',
            ta: '5 பருவகால கறிகளுடன் கூடிய உன்னதமான இலங்கை சைவ உணவு'
        },
        price: 200,
        category: 'Lunch',
        isVeg: true,
        image: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&q=80&w=800',
        availableDays: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
    },
    {
        name: {
            en: 'Rice and Curry (Chicken)',
            si: 'බත් සහ වෑංජන (කුකුළු මස්)',
            ta: 'சோறு மற்றும் கறி (கோழி)'
        },
        description: {
            en: 'Classic Sri Lankan chicken meal with spicy gravy',
            si: 'කුකුළු මස් වෑංජන සමඟ සාම්ප්‍රදායික බත් කෑමක්',
            ta: 'காரமான குழம்புடன் கூடிய உன்னதமான இலங்கை கோழி உணவு'
        },
        price: 280,
        category: 'Lunch',
        isVeg: false,
        image: 'https://images.unsplash.com/photo-1626777552726-4a6b547b4e5d?auto=format&fit=crop&q=80&w=800',
        availableDays: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
    },
    {
        name: {
            en: 'Chicken Fried Rice',
            si: 'චිකන් ෆ්‍රයිඩ් රයිස්',
            ta: 'சிக்கன் ப்ரைட் ரைஸ்'
        },
        description: {
            en: 'Wok-tossed rice with savory chicken and veggies',
            si: 'එළවළු සහ කුකුළු මස් එක් කළ රසවත් ෆ්‍රයිඩ් රයිස්',
            ta: 'சுவையான கோழி மற்றும் காய்கறிகளுடன் பொரித்த சோறு'
        },
        price: 350,
        category: 'Lunch',
        isVeg: false,
        image: 'https://images.unsplash.com/photo-1603133872878-684f208fb84b?auto=format&fit=crop&q=80&w=800',
        availableDays: ['Tuesday', 'Thursday', 'Sunday']
    },

    // Dinner
    {
        name: {
            en: 'Chicken Kottu',
            si: 'චිකන් කොත්තු',
            ta: 'சிக்கன் கொத்து'
        },
        description: {
            en: 'Chopped flatbread with veggies, egg and chicken',
            si: 'රොටි, එළවළු, බිත්තර සහ කුකුළු මස් සමඟ රසවත් කොත්තු',
            ta: 'காய்கறிகள், முட்டை மற்றும் கோழியுடன் நறுக்கப்பட்ட ரொட்டி'
        },
        price: 400,
        category: 'Dinner',
        isVeg: false,
        image: 'https://images.unsplash.com/photo-1630409351241-e90f0556557d?auto=format&fit=crop&q=80&w=800',
        availableDays: ['Monday', 'Wednesday', 'Friday', 'Saturday']
    },
    {
        name: {
            en: 'Cheese Kottu',
            si: 'චීස් කොත්තු',
            ta: 'சீஸ் கொத்து'
        },
        description: {
            en: 'Kottu with extra creamy cheese and spices',
            si: 'චීස් සහ කුළුබඩු එක් කළ රසවත් කොත්තු',
            ta: 'கூடுதல் க்ரீமி சீஸ் மற்றும் மசாலாப் பொருட்களுடன் கொத்து'
        },
        price: 500,
        category: 'Dinner',
        isVeg: false,
        image: 'https://images.unsplash.com/photo-1630409351277-3bcec95fde80?auto=format&fit=crop&q=80&w=800',
        availableDays: ['Friday', 'Saturday', 'Sunday']
    },
    {
        name: {
            en: 'String Hoppers Set',
            si: 'ඉඳිආප්ප පෑක් එකක්',
            ta: 'இடியாப்பம் தொகுப்பு'
        },
        description: {
            en: '15 string hoppers with dhal and spicy coconut gravy',
            si: 'පරිප්පු සහ සම්බෝල සමඟ ඉඳිආප්ප 15ක සෙට් එකක්',
            ta: '15 இடியாப்பம் பருப்பு மற்றும் தேங்காய் குழம்புடன்'
        },
        price: 180,
        category: 'Dinner',
        isVeg: true,
        image: 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&q=80&w=800',
        availableDays: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
    },

    // Snacks
    {
        name: {
            en: 'Fish Patties',
            si: 'මාළු පැටිස්',
            ta: 'மீன் பட்டிஸ்'
        },
        description: {
            en: 'Golden fried crispy pastry with spicy fish filling',
            si: 'මාළු මිශ්‍රණයක් සහිත රසවත් පැටිස්',
            ta: 'காரமான மீன் நிரப்புதலுடன் பொன்னிறமாக வறுத்த மிருதுவான மாவு'
        },
        price: 60,
        category: 'Snacks',
        isVeg: false,
        image: 'https://images.unsplash.com/photo-1601702538934-22f4b5f9038d?auto=format&fit=crop&q=80&w=800',
        availableDays: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
    },
    {
        name: {
            en: 'Vegetable Roll',
            si: 'එළවළු රෝල්',
            ta: 'காய்கறி ரோல்'
        },
        description: {
            en: 'Crispy crumbed roll with mixed vegetable filling',
            si: 'එළවළු මිශ්‍රණයක් සහිත රසවත් රෝල්',
            ta: 'கலவையான காய்கறி நிரப்புதலுடன் கூடிய மிருதுவான ரோல்'
        },
        price: 50,
        category: 'Snacks',
        isVeg: true,
        image: 'https://images.unsplash.com/photo-1601702538964-67210e74e40e?auto=format&fit=crop&q=80&w=800',
        availableDays: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
    },

    // Beverages
    {
        name: {
            en: 'Plain Tea',
            si: 'ප්ලේන් ටී',
            ta: 'பிளைன் டீ'
        },
        description: {
            en: 'Warm and refreshing strong Ceylon tea',
            si: 'නැවුම් සහ උණුසුම් තේ කෝප්පයක්',
            ta: 'வெதுவெதுப்பான மற்றும் புத்துணர்ச்சியூட்டும் பலமான இலங்கை தேநீர்'
        },
        price: 30,
        category: 'Beverages',
        isVeg: true,
        image: 'https://images.unsplash.com/photo-1544787210-22dbdc48a56f?auto=format&fit=crop&q=80&w=800',
        availableDays: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
    },
    {
        name: {
            en: 'Milk Tea',
            si: 'කිරි තේ',
            ta: 'பால் தேநீர்'
        },
        description: {
            en: 'Ceylon tea with creamy condensed milk',
            si: 'කිරි සහිත රසවත් උණුසුම් තේ කෝප්පයක්',
            ta: 'க்ரீமி கண்டென்ஸ்டு பாலுடன் இலங்கை தேநீர்'
        },
        price: 60,
        category: 'Beverages',
        isVeg: true,
        image: 'https://images.unsplash.com/photo-1594631252845-29fc458695d1?auto=format&fit=crop&q=80&w=800',
        availableDays: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
    },
    {
        name: {
            en: 'Fruit Juice',
            si: 'පළතුරු බීම',
            ta: 'பழச்சாறு'
        },
        description: {
            en: 'Freshly squeezed seasonal fruit juice',
            si: 'නැවුම් පලතුරු යුෂ',
            ta: 'புதிதாக பிழிந்த பருவகால பழச்சாறு'
        },
        price: 150,
        category: 'Beverages',
        isVeg: true,
        image: 'https://images.unsplash.com/photo-1613478223719-2ab802602423?auto=format&fit=crop&q=80&w=800',
        availableDays: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
    }
];

const seedDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/university-cafeteria');
        await Menu.deleteMany({});
        await Menu.insertMany(menuItems);
        console.log('Database Seeded Successfully');
        process.exit();
    } catch (err) {
        console.error('Seeding Error:', err);
        process.exit(1);
    }
};

seedDB();
