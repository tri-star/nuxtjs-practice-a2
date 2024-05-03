// this file is generated by scripts/build-tailwind-config.ts
/** @type {import('tailwindcss').Config} */
export default {
  content: ['./pages/index.vue'],
  theme: {
    backgroundColor: {
      'accent-primary': {
        default: 'rgba(14, 165, 233, 1)',
        hover: 'rgba(56, 189, 248, 1)',
        disabled: 'rgba(107, 114, 128, 1)',
        active: 'rgba(125, 211, 252, 1)',
      },
      button: {
        default: 'rgba(148, 163, 184, 1)',
        hover: 'rgba(203, 213, 225, 1)',
        active: 'rgba(203, 213, 225, 1)',
        disabled: 'rgba(156, 163, 175, 1)',
      },
      caution: {
        default: 'rgba(239, 68, 68, 1)',
        hover: 'rgba(252, 165, 165, 1)',
        active: 'rgba(252, 165, 165, 1)',
        disabled: 'rgba(107, 114, 128, 1)',
      },
      'on-button': {
        default: 'rgba(255, 255, 255, 0.9)',
        hover: 'rgba(255, 255, 255, 0.9)',
        disabled: 'rgba(255, 255, 255, 0.8)',
      },
      'on-accent-primary': {
        default: 'rgba(255, 255, 255, 0.9)',
        hover: 'rgba(255, 255, 255, 0.9)',
        disabled: 'rgba(255, 255, 255, 0.9)',
      },
      'on-caution': {
        default: 'rgba(30, 41, 59, 1)',
        hover: 'rgba(71, 85, 105, 1)',
        disabled: 'rgba(71, 85, 105, 1)',
      },
      input: {
        default: 'rgba(255, 255, 255, 1)',
        hover: 'rgba(224, 242, 254, 1)',
        active: 'rgba(224, 242, 254, 1)',
        disabled: 'rgba(229, 231, 235, 1)',
      },
      'on-input': {
        default: 'rgba(30, 41, 59, 1)',
        hover: 'rgba(71, 85, 105, 1)',
        disabled: 'rgba(71, 85, 105, 1)',
        placeholder: 'rgba(148, 163, 184, 1)',
      },
      outlined: {
        default: 'rgba(255, 255, 255, 0.2)',
        hover: 'rgba(56, 189, 248, 0.1)',
        active: 'rgba(56, 189, 248, 0.1)',
        disabled: 'rgba(229, 231, 235, 0.8)',
      },
      'on-outlined': {
        default: 'rgba(30, 41, 59, 1)',
        hover: 'rgba(51, 65, 85, 1)',
        disabled: 'rgba(51, 65, 85, 1)',
      },
      menu: {
        default: 'rgba(255, 255, 255, 0.6)',
        hover: 'rgba(224, 242, 254, 0.8)',
        active: 'rgba(224, 242, 254, 0.8)',
        disabled: 'rgba(229, 231, 235, 0.8)',
      },
      'on-menu': {
        default: 'rgba(30, 41, 59, 1)',
        hover: 'rgba(71, 85, 105, 1)',
        disabled: 'rgba(71, 85, 105, 1)',
      },
      default: 'rgba(255, 255, 255, 1)',
      'on-background': {
        default: 'rgba(30, 41, 59, 1)',
      },
      error: {
        default: 'rgba(254, 226, 226, 1)',
        hover: 'rgba(254, 242, 242, 1)',
        active: 'rgba(254, 242, 242, 1)',
        border: 'rgba(252, 165, 165, 1)',
        disabled: 'rgba(243, 244, 246, 1)',
      },
      'on-error': {
        default: 'rgba(220, 38, 38, 1)',
        hover: 'rgba(239, 68, 68, 1)',
        placeholder: 'rgba(252, 165, 165, 1)',
        disabled: 'rgba(209, 213, 219, 1)',
      },
      success: {
        default: 'rgba(163, 230, 53, 1)',
        hover: 'rgba(190, 242, 100, 1)',
        active: 'rgba(190, 242, 100, 1)',
        border: 'rgba(34, 197, 94, 1)',
        disabled: 'rgba(156, 163, 175, 1)',
      },
      'on-success': {
        default: 'rgba(54, 83, 20, 1)',
        hover: 'rgba(63, 98, 18, 1)',
        disabled: 'rgba(15, 23, 42, 1)',
      },
      'side-menu': {
        background: 'rgba(255, 255, 255, 1)',
        default: 'rgba(255, 255, 255, 1)',
        hover: 'rgba(224, 242, 254, 1)',
        active: 'rgba(224, 242, 254, 1)',
        border: 'rgba(224, 242, 254, 1)',
        disabled: 'rgba(226, 232, 240, 1)',
        'on-default': 'rgba(30, 41, 59, 1)',
        'on-hover': 'rgba(12, 74, 110, 1)',
        'on-disabled': 'rgba(30, 41, 59, 1)',
      },
      header: {
        background: 'rgba(255, 255, 255, 0.5)',
        default: 'rgba(255, 255, 255, 0.5)',
        hover: 'rgba(186, 230, 253, 1)',
        active: 'rgba(186, 230, 253, 1)',
        border: 'rgba(186, 230, 253, 1)',
        disabled: 'rgba(226, 232, 240, 1)',
        'on-default': 'rgba(30, 41, 59, 1)',
        'on-hover': 'rgba(30, 41, 59, 1)',
        'on-disabled': 'rgba(30, 41, 59, 1)',
      },
    },
    borderColor: {
      'accent-primary': {
        border: 'rgba(203, 213, 225, 1)',
      },
      button: {
        border: 'rgba(226, 232, 240, 1)',
      },
      caution: {
        border: 'rgba(153, 27, 27, 1)',
      },
      input: {
        border: 'rgba(203, 213, 225, 1)',
      },
      outlined: {
        border: 'rgba(203, 213, 225, 1)',
      },
      menu: {
        border: 'rgba(203, 213, 225, 0.8)',
      },
      error: {
        border: 'rgba(252, 165, 165, 1)',
      },
      success: {
        border: 'rgba(34, 197, 94, 1)',
      },
      'side-menu': {
        border: 'rgba(224, 242, 254, 1)',
      },
      header: {
        border: 'rgba(186, 230, 253, 1)',
      },
    },
    textColor: {
      'on-button': {
        default: 'rgba(255, 255, 255, 0.9)',
        hover: 'rgba(255, 255, 255, 0.9)',
        disabled: 'rgba(255, 255, 255, 0.8)',
      },
      'on-accent-primary': {
        default: 'rgba(255, 255, 255, 0.9)',
        hover: 'rgba(255, 255, 255, 0.9)',
        disabled: 'rgba(255, 255, 255, 0.9)',
      },
      'on-caution': {
        default: 'rgba(30, 41, 59, 1)',
        hover: 'rgba(71, 85, 105, 1)',
        disabled: 'rgba(71, 85, 105, 1)',
      },
      'on-input': {
        default: 'rgba(30, 41, 59, 1)',
        hover: 'rgba(71, 85, 105, 1)',
        disabled: 'rgba(71, 85, 105, 1)',
        placeholder: 'rgba(148, 163, 184, 1)',
      },
      'on-outlined': {
        default: 'rgba(30, 41, 59, 1)',
        hover: 'rgba(51, 65, 85, 1)',
        disabled: 'rgba(51, 65, 85, 1)',
      },
      'on-menu': {
        default: 'rgba(30, 41, 59, 1)',
        hover: 'rgba(71, 85, 105, 1)',
        disabled: 'rgba(71, 85, 105, 1)',
      },
      'on-background': {
        default: 'rgba(30, 41, 59, 1)',
      },
      'on-error': {
        default: 'rgba(220, 38, 38, 1)',
        hover: 'rgba(239, 68, 68, 1)',
        placeholder: 'rgba(252, 165, 165, 1)',
        disabled: 'rgba(209, 213, 219, 1)',
      },
      'on-success': {
        default: 'rgba(54, 83, 20, 1)',
        hover: 'rgba(63, 98, 18, 1)',
        disabled: 'rgba(15, 23, 42, 1)',
      },
      'side-menu': {
        'on-default': 'rgba(30, 41, 59, 1)',
        'on-hover': 'rgba(12, 74, 110, 1)',
        'on-disabled': 'rgba(30, 41, 59, 1)',
      },
      header: {
        'on-default': 'rgba(30, 41, 59, 1)',
        'on-hover': 'rgba(30, 41, 59, 1)',
        'on-disabled': 'rgba(30, 41, 59, 1)',
      },
    },
    margin: {
      'size-l-margin-x': '16',
      'size-s-margin-x': '12',
      'size-xs-margin-x': '12',
      'size-l-margin-y': '8',
      'size-s-margin-y': '8',
      'size-xs-margin-y': '4',
      'header-margin-x': '16',
      'header-margin-y': '8',
      'side-menu-margin-x': '12',
      'side-menu-margin-y': '12',
      'size-xl-margin-x': '16',
      'size-xl-margin-y': '8',
      'size-m-margin-x': '16',
      'size-m-margin-y': '8',
    },
    gap: {
      'size-l-gap': '8',
      'size-s-gap': '8',
      'size-xs-gap': '8',
      'header-gap': '16',
      'side-menu-gap': '12',
      'size-xl-gap': '8',
      'size-m-gap': '8',
    },
    borderRadius: {
      'size-l-round': '6',
      'size-s-round': '6',
      'size-xs-round': '6',
      'size-xl-round': '6',
      'size-m-round': '6',
    },
    height: {
      'size-l-height': '44',
      'size-s-height': '36',
      'size-xs-height': '28',
      'header-height': '80',
      'side-menu-height': '44',
      'size-xl-height': '56',
      'size-m-height': '40',
    },
    backgroundImage: {
      'login-background': "url('~/assets/login-background.png')",
    },
  },
  plugins: [],
}
