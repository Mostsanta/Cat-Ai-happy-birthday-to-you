
import React, { useState, useCallback } from 'react';
import { BirthdayData, FormStatus } from './types';
import { ZODIAC_SIGNS, GENDER_OPTIONS, FAMILY_STATUS_OPTIONS } from './constants';
import Input from './components/Input';
import { generateBirthdayGreeting } from './services/geminiService';

const initialData: BirthdayData = {
  name: '',
  age: '',
  zodiac: '',
  gender: '',
  industry: '',
  hobbies: '',
  religion: '',
  city: '',
  country: '',
  familyStatus: ''
};

const App: React.FC = () => {
  const [formData, setFormData] = useState<BirthdayData>(initialData);
  const [status, setStatus] = useState<FormStatus>(FormStatus.IDLE);
  const [result, setResult] = useState<string>('');
  const [error, setError] = useState<string>('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleClear = () => {
    setFormData(initialData);
    setResult('');
    setStatus(FormStatus.IDLE);
    setError('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim()) return;

    setStatus(FormStatus.LOADING);
    setError('');
    
    try {
      const greeting = await generateBirthdayGreeting(formData);
      setResult(greeting);
      setStatus(FormStatus.SUCCESS);
    } catch (err: any) {
      setError(err.message || "Что-то пошло не так");
      setStatus(FormStatus.ERROR);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(result);
    alert('Поздравление скопировано! 🐾');
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-12 md:py-20">
      <header className="text-center mb-12">
        <div className="inline-block p-3 rounded-full bg-indigo-100 text-indigo-600 mb-4 animate-bounce">
          <i className="fa-solid fa-cat fa-2x"></i>
        </div>
        <h1 className="text-4xl font-extrabold text-slate-900 mb-2">Кото-Генератор Поздравлений</h1>
        <p className="text-slate-500 max-w-lg mx-auto">
          Создайте идеальное поздравление с помощью хвостатого ИИ. 
          Ваши данные не сохраняются и удаляются при очистке.
        </p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Form Section */}
        <div className="lg:col-span-7 bg-white rounded-2xl shadow-xl border border-slate-100 overflow-hidden">
          <form onSubmit={handleSubmit} className="p-6 md:p-8 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input 
                label="Имя" 
                name="name" 
                value={formData.name} 
                onChange={handleInputChange} 
                required 
                placeholder="Как зовут именинника?"
              />
              <Input 
                label="Возраст" 
                name="age" 
                type="number" 
                value={formData.age || ''} 
                onChange={handleInputChange} 
                placeholder="Например, 25"
              />
              <Input 
                label="Пол" 
                name="gender" 
                value={formData.gender || ''} 
                onChange={handleInputChange} 
                options={GENDER_OPTIONS}
              />
              <Input 
                label="Знак зодиака" 
                name="zodiac" 
                value={formData.zodiac || ''} 
                onChange={handleInputChange} 
                options={ZODIAC_SIGNS}
              />
              <Input 
                label="Индустрия / Работа" 
                name="industry" 
                value={formData.industry || ''} 
                onChange={handleInputChange} 
                placeholder="IT, Медицина, Искусство..."
              />
              <Input 
                label="Хобби" 
                name="hobbies" 
                value={formData.hobbies || ''} 
                onChange={handleInputChange} 
                placeholder="Футбол, Чтение, Кулинария..."
              />
              <Input 
                label="Город" 
                name="city" 
                value={formData.city || ''} 
                onChange={handleInputChange} 
                placeholder="Москва, Санкт-Петербург..."
              />
              <Input 
                label="Страна" 
                name="country" 
                value={formData.country || ''} 
                onChange={handleInputChange} 
                placeholder="Россия, Казахстан..."
              />
              <Input 
                label="Религия" 
                name="religion" 
                value={formData.religion || ''} 
                onChange={handleInputChange} 
                placeholder="Если это важно..."
              />
              <Input 
                label="Семейный статус" 
                name="familyStatus" 
                value={formData.familyStatus || ''} 
                onChange={handleInputChange} 
                options={FAMILY_STATUS_OPTIONS}
              />
            </div>

            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <button
                type="submit"
                disabled={status === FormStatus.LOADING}
                className={`flex-1 py-4 px-6 rounded-2xl font-bold text-white transition-all shadow-lg active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed text-lg ${
                  status === FormStatus.LOADING 
                    ? 'bg-slate-400' 
                    : 'bg-gradient-to-r from-orange-400 to-red-500 hover:from-orange-500 hover:to-red-600'
                }`}
              >
                {status === FormStatus.LOADING ? (
                  <span className="flex items-center justify-center gap-2">
                    <span className="text-2xl animate-bounce">🐱</span> Хрум-хрум...
                  </span>
                ) : (
                  <span className="flex items-center justify-center gap-2">
                    <span className="text-2xl">🐈✨</span> Наколдовать!
                  </span>
                )}
              </button>
              <button
                type="button"
                onClick={handleClear}
                className="py-4 px-6 rounded-2xl font-bold text-slate-600 bg-slate-100 hover:bg-slate-200 transition-all shadow-sm active:scale-95 text-lg"
              >
                <span className="flex items-center justify-center gap-2">
                  <span className="text-2xl">🙀🧹</span> Стереть всё
                </span>
              </button>
            </div>
          </form>
        </div>

        {/* Result Section */}
        <div className="lg:col-span-5 sticky top-8">
          {status === FormStatus.SUCCESS ? (
            <div className="bg-white rounded-2xl shadow-2xl border border-indigo-50 p-6 md:p-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                  <span className="text-2xl">😻</span>
                  Результат
                </h2>
                <button 
                  onClick={copyToClipboard}
                  className="bg-indigo-50 hover:bg-indigo-100 px-4 py-2 rounded-xl text-indigo-600 text-sm font-bold flex items-center gap-2 transition-all active:scale-95"
                >
                  <span className="text-xl">🐾</span> Забрать в лапки
                </button>
              </div>
              <div className="prose prose-indigo max-w-none text-slate-700 whitespace-pre-wrap leading-relaxed">
                {result}
              </div>
              <div className="mt-8 pt-6 border-t border-slate-100 flex items-center justify-center gap-4 text-xs text-slate-400 italic">
                <span className="text-lg">😸</span>
                Ваши секреты под надежной защитой
              </div>
            </div>
          ) : status === FormStatus.LOADING ? (
            <div className="bg-white rounded-2xl border border-dashed border-indigo-200 p-12 flex flex-col items-center justify-center text-center space-y-4">
              <div className="text-6xl animate-bounce">🐈‍⬛</div>
              <p className="text-slate-500 font-medium italic">Кот усиленно думает над текстом...</p>
            </div>
          ) : error ? (
            <div className="bg-red-50 rounded-2xl border border-red-100 p-8 text-center space-y-4">
              <div className="text-5xl">😿</div>
              <p className="text-red-800 font-medium">{error}</p>
              <button 
                onClick={handleSubmit}
                className="bg-white px-6 py-2 rounded-xl shadow-sm border border-red-200 text-red-600 font-bold hover:bg-red-100 transition-all flex items-center gap-2 mx-auto active:scale-95"
              >
                <span className="text-xl">🔄</span> Попробовать ещё
              </button>
            </div>
          ) : (
            <div className="bg-slate-50 rounded-2xl border-2 border-dashed border-slate-200 p-12 flex flex-col items-center justify-center text-center space-y-4">
              <div className="text-6xl grayscale opacity-30">🐈</div>
              <div className="space-y-1">
                <p className="text-slate-500 font-semibold">Жду ваших указаний!</p>
                <p className="text-slate-400 text-sm">Заполните данные слева, чтобы я начал мурчать поздравление.</p>
              </div>
            </div>
          )}
        </div>
      </div>

      <footer className="mt-20 pt-8 border-t border-slate-200 text-center text-slate-400 text-sm flex flex-col items-center gap-2">
        <p>&copy; {new Date().getFullYear()} Кото-Поздравления. Мяу!</p>
        <p className="flex items-center gap-1">
          <span className="text-lg">😺</span> Конфиденциальность гарантирована хвостом
        </p>
      </footer>
    </div>
  );
};

export default App;
