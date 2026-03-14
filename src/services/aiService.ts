import { GoogleGenAI } from "@google/genai";

const env = (import.meta as ImportMeta & { env?: Record<string, string | undefined> }).env || {};
const API_KEY = env.VITE_GEMINI_API_KEY || env.GEMINI_API_KEY || "";

const getClient = () => {
  if (!API_KEY) {
    throw new Error("Gemini API key is not set. Add VITE_GEMINI_API_KEY (or GEMINI_API_KEY) to .env.");
  }
  return new GoogleGenAI({ apiKey: API_KEY });
};

export const aiService = {
  /**
   * 뉴스 기사 요약 생성
   */
  async generateNewsSummary(title: string, content: string): Promise<string> {
    try {
      const prompt = `다음 뉴스 기사를 어르신들이 이해하기 쉽게 3문장 이내로 요약해줘.
        제목: ${title}
        내용: ${content}`;

      const ai = getClient();
      const result = await ai.models.generateContent({
        model: "gemini-2.0-flash",
        contents: prompt,
      });
      return result.text || "요약을 생성할 수 없습니다.";
    } catch (error) {
      console.error("News Summary Error:", error);
      throw error;
    }
  },

  /**
   * AI 채팅 메시지 전송
   */
  async sendMessage(history: { role: 'user' | 'model', text: string }[], newMessage: string): Promise<string> {
    try {
      const ai = getClient();
      const chat = ai.chats.create({
        model: "gemini-2.0-flash",
        config: {
          systemInstruction:
            "당신은 대한민국 보건복지부 기초연금 전문 상담원입니다. 어르신들이 이해하기 쉽게 친절하고 명확하게 답변하세요. 기초연금 자격, 신청 방법, 소득인정액 계산법 등에 대해 전문적인 지식을 바탕으로 안내하세요. 답변은 한국어로 하세요.",
        },
        history: history.map((m) => ({
          role: m.role,
          parts: [{ text: m.text }],
        })),
      });

      const result = await chat.sendMessage({
        message: newMessage,
      });
      return result.text || "죄송합니다. 답변을 생성하지 못했습니다.";
    } catch (error) {
      console.error("AI Chat Error:", error);
      throw error;
    }
  }
};
