import AsyncStorage from '@react-native-async-storage/async-storage';
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  en: {
    translation: {
      welcome: {
        title: "Welcome to Trackmus!",
        createTasks: "Create Tasks",
        recordSessions: "Record Sessions",
        lookResults: "Track Your Results"
      },
      common: {
        save: 'Save',
        cancel: 'Cancel',
        error: 'Error',
      },
      auth: {
        login: 'Login',
        loginTitle: 'Login',
        register: 'Register',
        registerTitle: 'Register',
        email: 'Email',
        password: 'Password',
        confirmPassword: 'Confirm Password',
        withGoogle: 'Continue with Google',
        confirmEmailTitle: 'Email Confirmation',
        confirmEmailMessage: 'The message was sent on your Email. Follow the link for confirmation.',
        emailConfirmed: 'Done',
        emailNotConfirmed: 'Email is not confirmed. Check your mail. The message may be in a Spam folder.',
        resendConfirmation: 'Resend',
        emailSent: 'Email sent',
        in: "in",
      },
      tabs: {
        stats: 'Stats',
        tasks: 'Tasks',
        profile: 'Profile',
      },
      pages: {
        settings: 'Settings',
      },
      profile: {

      },
      settings: {
        language: 'Language',
        theme: 'Theme',
        dark: 'Dark',
        light: 'Light',
        account: 'Account',
        editProfile: 'Edit profile',
        changePassword: 'Change password',
        logout: 'Logout',
      },
      tasks: {
        active: 'Active',
        done: 'Done',
        empty: 'No tasks yet',
      },
    },
  },
  ru: {
    translation: {
      welcome: {
        title: "Добро пожаловать!",
        createTasks: "Создавайте задачи",
        recordSessions: "Записывайте занятия",
        lookResults: "Следите за результатом"
      },
      common: {
        save: 'Сохранить',
        cancel: 'Отмена',
        error: 'Ошибка',
      },
      auth: {
        login: 'Войти',
        loginTitle: 'Вход',
        register: 'Зарегистрироваться',
        registerTitle: 'Регистрация',
        email: 'Email',
        password: 'Пароль',
        confirmPassword: 'Подтвердите пароль',
        withGoogle: 'Продолжить с Google',
        confirmEmailTitle: 'Подтверждение Email',
        confirmEmailMessage: 'На ваш Email было направлено письмо. Перейдите по ссылке из письма для подтверждения.',
        emailConfirmed: 'Готово',
        emailNotConfirmed: 'Email еще не подтвержден. Проверьте почту. Письмо могло попасть в папку Спам',
        resendConfirmation: 'Отправить заново',
        emailSent: 'Email отправлен',
        in: "через",
      },
      tabs: {
        stats: 'Статистика',
        tasks: 'Задачи',
        profile: 'Профиль',
      },
      pages: {
        settings: 'Настройки',
      },
      profile: {

      },
      settings: {
        language: 'Язык',
        theme: 'Тема',
        dark: 'Тёменая',
        light: 'Светлая',
        account: 'Аккаунт',
        editProfile: 'Редактировать профиль',
        changePassword: 'Сменить пароль',
        logout: 'Выйти',
      },
      tasks: {
        active: 'Активные',
        done: 'Завершенные',
        empty: 'Задач пока нет',
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