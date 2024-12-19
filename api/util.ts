import { openai } from "@ai-sdk/openai";
import { generateText } from "ai";

export const CodeGenerator = async (output: string) => {
  const { text } = await generateText({
    model: openai("gpt-3.5-turbo"),
    system:
      "You are an expert code golfer in the befunge language" +
      "Given an code output, you give the shortest code that produces that output." +
      "You will only be given the code output and nothing else. You will only give the code, and nothing else.",
    prompt: `${output}`,
  });
  return text;
};
