import AsyncStorage from '@react-native-async-storage/async-storage';
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
    en: {
        translation: {
            common: {
                save: 'Save',
                cancel: 'Cancel',
            },
            auth: {
                login: 'Login',
                register: 'Register',
                email: 'Email',
                password: 'Password',
                confirmPassword: 'Confirm Password',
                withGoogle: 'Continue with Google',
            },
        },
    },
    ru: {
        translation: {
            common: {
                save: 'Сохранить',
                cancel: 'Отмена',
            },
            auth: {
                login: 'Войти',
                register: 'Регистрация',
                email: 'Email',
                password: 'Пароль',
                confirmPassword: 'Подтвердите пароль',
                withGoogle: 'Продолжить с Google',
            },
        },
    },
};

const LANGUAGE_STORAGE_KEY = 'app_language';

i18n
    .use(initReactI18next)
    .init({
        resources,
        lng: 'en',
        interpolation: {
            escapeValue: false,
        },
        defaultNS: 'translation',
    });

export const initI18n = async () => {
    try {
        const savedLanguage = await AsyncStorage.getItem(LANGUAGE_STORAGE_KEY);
        if (savedLanguage && (savedLanguage === 'en' || savedLanguage === 'ru')) {
            i18n.changeLanguage(savedLanguage);
        }
    } catch (error) {
        console.error('Error loading language: ', error);
    }
};

export const changeLanguage = async (lang: 'en' | 'ru') => {
    try {
        await i18n.changeLanguage(lang);
        await AsyncStorage.setItem(LANGUAGE_STORAGE_KEY, lang);
    } catch (error) {
        console.error('Error saving language: ', error);
    }
};

export default i18n;