import { TELEGRAM_URL } from '../../constants';
 
const TGIcon = () => (
    <a href={TELEGRAM_URL} className='control-item' target='_blank' rel="noreferrer">
        <img className='control-icon' src="/tg.svg" alt="Нагадування в Telegram" />
    </a>
);

export default TGIcon;
