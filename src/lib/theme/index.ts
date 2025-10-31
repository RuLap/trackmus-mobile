export interface Theme {
    colors: {
        primary: string;
        secondary: string;
        success: string;
        warning: string;
        error: string;
        background: string;
        card: string;
        text: string;
        textSecondary: string;
        border: string;
        notification: string;
        googleBtn: string;
    };
    spacing: {
        xs: number;
        s: number;
        m: number;
        l: number;
        xl: number;
        xxl: number;
    };
    borderRadius: {
        small: number;
        medium: number;
        large: number;
    };
    typography: {
        title: {
            fontSize: number;
            fontWeight: 400 | 500 | 600 | 700;
            lineHeight: number;
        };
        header: {
            fontSize: number;
            fontWeight: 400 | 500 | 600 | 700;
            lineHeight: number;
        };
        body: {
            fontSize: number;
            fontWeight: 400 | 500 | 600 | 700;
            lineHeight: number;
        };
        caption: {
            fontSize: number;
            fontWeight: 400 | 500 | 600 | 700;
            lineHeight: number;
        };
    };
}

export const lightTheme: Theme = {
    colors: {
        primary: '#4f46e5',
        secondary: '#a5b4fc',
        success: '#10B981',
        warning: '#F59E0B',
        error: '#EF4444',
        background: '#f9f9f9',
        card: '#F8FAFC',
        text: '#1E293B',
        textSecondary: '#64748B',
        border: '#E2E8F0',
        notification: '#FF6B6B',
        googleBtn: '#131314'
    },
    spacing: {
        xs: 4,
        s: 8,
        m: 16,
        l: 24,
        xl: 32,
        xxl: 48,
    },
    borderRadius: {
        small: 4,
        medium: 8,
        large: 16,
    },
    typography: {
        title: {
            fontSize: 24,
            fontWeight: 700,
            lineHeight: 32,
        },
        header: {
            fontSize: 20,
            fontWeight: 600,
            lineHeight: 28,
        },
        body: {
            fontSize: 16,
            fontWeight: 400,
            lineHeight: 24,
        },
        caption: {
            fontSize: 14,
            fontWeight: 400,
            lineHeight: 20,
        },
    },
};

export const darkTheme: Theme = {
    ...lightTheme,
    colors: {
        primary: '#4f46e5',
        secondary: '#a5b4fc',
        success: '#34D399',
        warning: '#FBBF24',
        error: '#F87171',
        background: '#101022',
        card: '#1E293B',
        text: '#F1F5F9',
        textSecondary: '#94A3B8',
        border: '#334155',
        notification: '#FF6B6B',
        googleBtn: '#fff'
    },
};

export type ThemeType = 'light' | 'dark';