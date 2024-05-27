const { OpenAI } = require('openai');
const api = "sk-proj-CnvVLX92wR6uCWalUGF7T3BlbkFJNcLL6h8BWmMJxJTJGbLd";

const openai = new OpenAI({
  apiKey: api,
});

exports.name = '/cliff/gpt3-5-turbo';
exports.index = async (req, res) => {
  try {
    const userMessage = req.query.ask;

    function getCurrentWeather(location, unit = 'fahrenheit') {
      const weatherInfo = {
        location: location,
        temperature: '72',
        unit: unit,
        forecast: ['sunny', 'windy'],
      };
      return JSON.stringify(weatherInfo);
    }

    function getCurrentTime(location) {
      const currentTime = new Date().toLocaleTimeString('en-US', { timeZone: location });
      return `Current time in ${location}: ${currentTime}`;
    }

    const messages = [
      { role: 'user', content: userMessage },
    ];

    const functions = [
      {
        name: 'get_current_weather',
        description: 'Get the current weather in a given location',
        parameters: {
          type: 'object',
          properties: {
            location: {
              type: 'string',
              description: 'The city and state, e.g. San Francisco, CA',
            },
            unit: { type: 'string', enum: ['celsius', 'fahrenheit'] },
          },
          required: ['location'],
        },
      },
      {
        name: 'get_current_time',
        description: 'Get the current time in a given location',
        parameters: {
          type: 'object',
          properties: {
            location: {
              type: 'string',
              description: 'The city and state, e.g. New York, NY',
            },
          },
          required: ['location'],
        },
      },
    ];

    const response = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: messages,
      functions: functions,
      function_call: 'auto',
    });

    const responseMessage = response.choices[0].message;

    if (responseMessage.function_call) {
      const availableFunctions = {
        get_current_weather: getCurrentWeather,
        get_current_time: getCurrentTime,
      };

      const functionName = responseMessage.function_call.name;
      const functionToCall = availableFunctions[functionName];
      const functionArgs = JSON.parse(responseMessage.function_call.arguments);
      const functionResponse = functionToCall(
        functionArgs.location,
        functionArgs.unit
      );

      messages.push(responseMessage);
      messages.push({
        role: 'function',
        name: functionName,
        content: functionResponse,
      });

      const secondResponse = await openai.chat.completions.create({
        model: 'gpt-3.5-turbo',
        messages: messages,
      });

      res.json({ response: secondResponse.choices[0].message.content });
    } else {
      res.json({ response: responseMessage.content });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error:error });
  }
};
