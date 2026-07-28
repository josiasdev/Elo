import js from '@eslint/js'
import prettier from 'eslint-config-prettier'
import tseslint from 'typescript-eslint'

export default tseslint.config(
  {
    ignores: ['dist', 'coverage', 'node_modules', 'eslint.config.js'],
  },
  js.configs.recommended,
  ...tseslint.configs.recommendedTypeChecked,
  {
    languageOptions: {
      parserOptions: {
        allowDefaultProject: ['eslint.config.js'],
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
      globals: {
        document: 'readonly',
        fetch: 'readonly',
        HTMLElement: 'readonly',
        localStorage: 'readonly',
        Response: 'readonly',
        window: 'readonly',
      },
    },
    rules: {
      '@typescript-eslint/consistent-type-imports': [
        'error',
        { fixStyle: 'inline-type-imports' },
      ],
      '@typescript-eslint/no-misused-promises': [
        'error',
        { checksVoidReturn: { attributes: false } },
      ],
    },
  },
  prettier,
)
