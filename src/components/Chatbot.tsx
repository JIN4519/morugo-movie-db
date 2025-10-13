import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Bot } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';

interface Message {
  id: string;
  content: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

interface ChatbotProps {
  movies: any[];
}

export function Chatbot({ movies }: ChatbotProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      content: '안녕하세요! 모르고 영화 추천 챗봇입니다. 어떤 영화를 찾고 계신가요? 🎬',
      sender: 'bot',
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const generateBotResponse = (userMessage: string): string => {
    const message = userMessage.toLowerCase();
    
    // 장르별 추천
    if (message.includes('액션') || message.includes('action')) {
      const actionMovies = movies.filter(movie => 
        movie.genre.some((g: string) => g.includes('액션'))
      );
      if (actionMovies.length > 0) {
        const randomMovie = actionMovies[Math.floor(Math.random() * actionMovies.length)];
        return `액션 영화를 좋아하시는군요! "${randomMovie.title}"을 추천드립니다. ${randomMovie.rating > 0 ? `평점 ${randomMovie.rating}/10` : '최신작'}이에요. ${randomMovie.synopsis.slice(0, 50)}...`;
      }
    }
    
    if (message.includes('코미디') || message.includes('웃긴') || message.includes('재미있는')) {
      const comedyMovies = movies.filter(movie => 
        movie.genre.some((g: string) => g.includes('코미디'))
      );
      if (comedyMovies.length > 0) {
        const randomMovie = comedyMovies[Math.floor(Math.random() * comedyMovies.length)];
        return `코미디 영화 어떠세요? "${randomMovie.title}"을 추천합니다! 스트레스 해소에 딱이에요. 😄`;
      }
    }
    
    if (message.includes('sf') || message.includes('공상과학') || message.includes('미래')) {
      const sfMovies = movies.filter(movie => 
        movie.genre.some((g: string) => g.includes('SF'))
      );
      if (sfMovies.length > 0) {
        const randomMovie = sfMovies[Math.floor(Math.random() * sfMovies.length)];
        return `SF 영화를 찾고 계시는군요! "${randomMovie.title}"을 추천드립니다. 🚀 상상력을 자극하는 작품이에요.`;
      }
    }

    // 평점 관련 질문
    if (message.includes('평점') || message.includes('높은') || message.includes('좋은')) {
      const topRated = movies
        .filter(movie => movie.rating > 8.5)
        .sort((a, b) => b.rating - a.rating);
      if (topRated.length > 0) {
        const movie = topRated[0];
        return `평점이 높은 영화를 찾으시는군요! "${movie.title}"이 평점 ${movie.rating}/10으로 최고예요. ${movie.reviewCount.toLocaleString()}명의 관객이 평가했습니다.`;
      }
    }

    // 최신 영화
    if (message.includes('최신') || message.includes('새로운') || message.includes('신작')) {
      const latestMovies = movies
        .filter(movie => new Date(movie.releaseDate) > new Date('2023-01-01'))
        .sort((a, b) => new Date(b.releaseDate).getTime() - new Date(a.releaseDate).getTime());
      if (latestMovies.length > 0) {
        const movie = latestMovies[0];
        return `최신 영화를 찾으시는군요! "${movie.title}"이 가장 최근 작품입니다. ${new Date(movie.releaseDate).getFullYear()}년 작품이에요.`;
      }
    }

    // 상영예정작
    if (message.includes('상영예정') || message.includes('곧') || message.includes('예정')) {
      const upcomingMovies = movies.filter(movie => movie.status === 'upcoming');
      if (upcomingMovies.length > 0) {
        const movie = upcomingMovies[Math.floor(Math.random() * upcomingMovies.length)];
        return `상영예정작을 궁금해하시는군요! "${movie.title}"이 ${new Date(movie.releaseDate).toLocaleDateString('ko-KR')}에 개봉 예정입니다. 기대해주세요! 🎉`;
      }
    }

    // 감독 관련
    if (message.includes('감독') || message.includes('연출')) {
      const randomMovie = movies[Math.floor(Math.random() * movies.length)];
      return `"${randomMovie.title}"은 ${randomMovie.director} 감독의 작품입니다. 이 감독의 다른 작품도 관심 있으시다면 알려주세요!`;
    }

    // 기본 응답들
    const responses = [
      '흥미로운 질문이네요! 더 구체적으로 어떤 장르의 영화를 원하시나요? (액션, 코미디, SF, 드라마 등)',
      '좋은 영화를 찾아드릴게요! 기분이나 상황을 알려주시면 더 정확한 추천이 가능해요.',
      '영화 추천을 위해 조금 더 자세히 알려주세요. 예를 들어 "재미있는 액션 영화" 또는 "감동적인 드라마" 같이요!',
      '현재 ' + movies.length + '편의 영화 정보를 가지고 있어요. 어떤 영화를 찾고 계신지 구체적으로 말씀해주세요!',
      '영화 추천 외에도 평점, 개봉일, 출연진 정보도 알려드릴 수 있어요. 무엇이 궁금하신가요?'
    ];
    
    return responses[Math.floor(Math.random() * responses.length)];
  };

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content: inputMessage,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsTyping(true);

    // Simulate bot typing delay
    setTimeout(() => {
      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        content: generateBotResponse(inputMessage),
        sender: 'bot',
        timestamp: new Date()
      };

      setMessages(prev => [...prev, botResponse]);
      setIsTyping(false);
    }, 1500);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const quickQuestions = [
    '액션 영화 추천해줘',
    '평점 높은 영화는?',
    '최신 영화 알려줘',
    '상영예정작 뭐있어?',
    'SF 영화 보여줘',
    '코미디 영화 추천'
  ];

  return (
    <>
      {/* Chatbot Toggle Button */}
      <Button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 w-14 h-14 rounded-full shadow-lg bg-cyan-500 hover:bg-cyan-600 z-40"
        style={{ display: isOpen ? 'none' : 'flex' }}
      >
        <MessageCircle className="w-6 h-6" />
      </Button>

      {/* Chatbot Window */}
      {isOpen && (
        <div className="fixed bottom-6 right-6 w-96 h-[600px] bg-white dark:bg-slate-800 rounded-lg shadow-xl border border-gray-200 dark:border-slate-600 z-50 flex flex-col">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-slate-600">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-cyan-500 rounded-full flex items-center justify-center">
                <Bot className="w-4 h-4 text-white" />
              </div>
              <div>
                <h3 className="font-medium text-gray-900 dark:text-white">모르고 봇</h3>
                <p className="text-xs text-gray-500 dark:text-gray-400">영화 추천 도우미</p>
              </div>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsOpen(false)}
              className="p-1"
            >
              <X className="w-4 h-4" />
            </Button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4">
            <div className="space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[85%] rounded-lg p-3 ${
                      message.sender === 'user'
                        ? 'bg-cyan-500 text-white'
                        : 'bg-gray-100 dark:bg-slate-700 text-gray-900 dark:text-white'
                    }`}
                  >
                    <p className="text-sm whitespace-pre-line break-words leading-relaxed">{message.content}</p>
                    <p className={`text-xs mt-1 ${
                      message.sender === 'user' 
                        ? 'text-cyan-50' 
                        : 'text-gray-500 dark:text-gray-400'
                    }`}>
                      {message.timestamp.toLocaleTimeString('ko-KR', { 
                        hour: '2-digit', 
                        minute: '2-digit' 
                      })}
                    </p>
                  </div>
                </div>
              ))}

              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-gray-100 dark:bg-slate-700 rounded-lg p-3">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    </div>
                  </div>
                </div>
              )}

              {/* Quick Questions */}
              {messages.length === 1 && (
                <div className="space-y-2">
                  <p className="text-xs text-gray-500 dark:text-gray-400 text-center mb-2">💡 빠른 질문</p>
                  <div className="grid grid-cols-2 gap-2">
                    {quickQuestions.map((question, index) => (
                      <button
                        key={index}
                        onClick={() => {
                          setInputMessage(question);
                          setTimeout(() => handleSendMessage(), 100);
                        }}
                        className="text-left p-2 text-xs bg-gray-50 dark:bg-slate-600 hover:bg-cyan-50 dark:hover:bg-slate-500 rounded border border-gray-200 dark:border-slate-500 text-gray-700 dark:text-gray-300 transition-colors"
                      >
                        {question}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="p-4 border-t border-gray-200 dark:border-slate-600">
            <div className="flex space-x-2">
              <Input
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="영화에 대해 물어보세요..."
                className="flex-1"
                disabled={isTyping}
              />
              <Button
                onClick={handleSendMessage}
                disabled={!inputMessage.trim() || isTyping}
                size="sm"
              >
                <Send className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}