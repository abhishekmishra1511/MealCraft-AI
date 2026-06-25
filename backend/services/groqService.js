import Groq from 'groq-sdk';

export const generateRecipePrompt = async (ingredients, diet, cuisine, cookTime, kitchenGroceries = []) => {
  try {
    if (!process.env.GROQ_API_KEY || process.env.GROQ_API_KEY === 'your_groq_api_key_here') {
      console.warn('Using mock recipe generation due to missing Groq API Key.');
      return generateMockRecipe(ingredients, cuisine);
    }

    const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });
    
    // Combine explicit ingredients and kitchen groceries if they want to use them
    const allIngredients = [...new Set([...(ingredients || []), ...(kitchenGroceries || [])])];

    const prompt = `
      Act as an expert chef. Generate a detailed recipe using the following preferences:
      
      Ingredients Available: ${allIngredients.join(', ') || 'Any common ingredients'}
      Diet: ${diet || 'None'}
      Cuisine: ${cuisine || 'Any'}
      Cooking Time: ${cookTime || 'Any'}
      
      Respond STRICTLY with a JSON object containing the exact following keys and no extra text or markdown code blocks:
      {
        "title": "String (A descriptive name for the recipe)",
        "ingredients": ["Array of Strings (Measurements and ingredients)"],
        "instructions": ["Array of Strings (Step by step instructions)"],
        "nutrition": { "calories": "String", "protein": "String", "carbs": "String", "fat": "String" },
        "cookingTime": "String (e.g., 30 minutes)",
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
