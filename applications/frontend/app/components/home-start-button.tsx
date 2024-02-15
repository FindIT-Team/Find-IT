export function HomeStartButton() {
  return (
    <div>
      <button onClick={() => handleClick('/auth/login')}>Начать</button>
      <button onClick={() => handleClick('/help/faq')}>
        Нужна помощь? <span>Посмотрите FAQ</span>
      </button>
    </div>
  );
}
