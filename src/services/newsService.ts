import { NewsItem } from '../types';
import { NEWS_DATA_INITIAL } from '../constants/data';

/**
 * 기초연금 관련 실시간 뉴스를 관리하는 서비스
 */
class NewsService {
  /**
   * 실제 API(예: 네이버 뉴스 API, 정부 공공데이터 포털 등)에서 뉴스를 가져오는 함수
   * 현재는 API 키가 없으므로 구조만 잡고 초기 데이터를 반환하도록 설정
   */
  async fetchLatestNews(): Promise<NewsItem[]> {
    try {
      // 실제 환경에서는 여기서 fetch('https://api.example.com/news') 등을 호출합니다.
      // 지금은 네트워크 지연 시간을 시뮬레이션하고 데이터를 반환합니다.
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve(NEWS_DATA_INITIAL);
        }, 800);
      });
    } catch (error) {
      console.error('뉴스 데이터를 가져오는데 실패했습니다:', error);
      return NEWS_DATA_INITIAL;
    }
  }

  /**
   * 특정 키워드로 뉴스를 검색하는 기능
   */
  async searchNews(query: string): Promise<NewsItem[]> {
    const allNews = await this.fetchLatestNews();
    if (!query) return allNews;
    return allNews.filter(n => n.title.includes(query) || n.content.includes(query));
  }
}

export const newsService = new NewsService();
