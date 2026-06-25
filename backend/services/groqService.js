import Groq from 'groq-sdk';

export const generateRecipePrompt = async (ingredients, dietType, cuisine, mealType, kitchenGroceries = []) => {
  try {
    if (!process.env.GROQ_API_KEY || process.env.GROQ_API_KEY === 'your_groq_api_key_here') {
      console.warn('Using mock recipe generation due to missing Groq API Key.');
      return generateMockRecipe(ingredients, cuisine);
    }

    const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });
    
    // Combine explicit ingredients and kitchen groceries if they want to use them
    const allIngredients = [...new Set([...(ingredients || []), ...(kitchenGroceries || [])])];

    const prompt = `
      Act as an expert chef. Generate a detailed, creative, and delicious recipe using the following preferences:
      
      Ingredients Available: ${allIngredients.join(', ') || 'Any common ingredients'}
      Diet: ${dietType || 'None'}
      Cuisine: ${cuisine || 'Any'}
      Meal Type: ${mealType || 'Any'} 
      
      Respond STRICTLY with a JSON object containing the exact following keys and no extra text or markdown code blocks. 
      The "title" MUST be a specific, creative, and appetizing name for the dish (e.g. "Spicy Garlic Butter Paneer" instead of just "Generated Recipe").
      
      {
        "title": "String (A specific, creative, and appetizing name for the dish)",
        "ingredients": ["Array of Strings (Measurements and ingredients)"],
        "instructions": ["Array of Strings (Step by step instructions)"],
        "nutrition": { "calories": "String", "protein": "String", "carbs": "String", "fat": "String" },
        "prepTime": "Number (in minutes)",
        "cookTime": "Number (in minutes)",
        "difficulty": "String (Easy, Medium, Hard)"
      }
    `;

    const chatCompletion = await groq.chat.completions.create({
      messages: [
        {
          role: 'user',
          content: prompt,
        },
      ],
      model: 'llama3-8b-8192', // Or 'mixtral-8x7b-32768' depending on availability
      temperature: 0.7,
    });

    const responseContent = chatCompletion.choices[0]?.message?.content;
    
    // Attempt to parse JSON safely
    try {
      // In case Groq adds markdown formatting like ```json ... ```
      const cleanedJSON = responseContent.replace(/```json/gi, '').replace(/```/g, '').trim();
      const parsed = JSON.parse(cleanedJSON);
      
      if (!parsed.title) {
        parsed.title = parsed.name || parsed.recipeName || parsed.dishName || 'Generated Recipe';
      }
      
      // Inject requested metadata back into the recipe so frontend can display them nicely
      parsed.cuisine = cuisine || 'Fusion';
      parsed.mealType = mealType || 'Main Course';
      parsed.dietType = dietType || 'None';
      parsed.totalTime = (parseInt(parsed.prepTime) || 0) + (parseInt(parsed.cookTime) || 0) || 30;
      
      return parsed;
    } catch (parseError) {
      console.error('Failed to parse Groq response as JSON:', responseContent);
      throw new Error('Invalid response format from AI.');
    }
  } catch (error) {
    console.error('Groq Service Error:', error);
    throw error;
  }
};

const generateMockRecipe = (ingredients, cuisine) => {
  return {
    title: `Mock ${cuisine || 'Delicious'} ${ingredients?.[0] || 'Mystery'} Dish`,
    ingredients: ['1 cup ' + (ingredients?.[0] || 'Water'), '1 tbsp Salt'],
    instructions: ['Mix well', 'Cook for 20 minutes'],
    nutrition: { calories: '300 kcal', protein: '10g', carbs: '20g', fat: '5g' },
    cookingTime: '20 minutes',
    difficulty: 'Easy'
  };
};
