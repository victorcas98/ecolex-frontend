# Guia de Cores Acessíveis - EcoLex

Este documento define o padrão de cores a ser usado em todo o projeto para garantir acessibilidade e consistência visual.

## 🎨 Sistema de Cores

### Cores Principais
Use sempre as classes `accessible-*` para garantir compatibilidade com o sistema de temas:

```css
/* Backgrounds */
bg-accessible-bg-primary      /* Fundo principal (branco/preto) */
bg-accessible-bg-secondary    /* Fundo secundário (cinza claro/cinza escuro) */

/* Textos */
text-accessible-text-primary    /* Texto principal (preto/branco) */
text-accessible-text-secondary  /* Texto secundário (cinza escuro/cinza claro) */

/* Estados */
text-accessible-accent         /* Links e botões primários (azul/amarelo) */
text-accessible-accent-hover   /* Hover em links e botões */
text-accessible-error         /* Mensagens de erro (vermelho/vermelho claro) */
text-accessible-success       /* Mensagens de sucesso (verde/verde claro) */
text-accessible-warning       /* Mensagens de aviso (amarelo/amarelo claro) */

/* Bordas */
border-accessible-border      /* Bordas padrão */
border-accessible-focus       /* Bordas de foco */
```

## ❌ Cores a EVITAR

**Não use** estas classes que não respondem ao sistema de temas:

```css
/* ❌ Evitar - cores fixas */
text-gray-500
text-gray-400
text-gray-600
text-gray-700
text-gray-800
bg-gray-50
bg-gray-100
bg-white
text-black

/* ❌ Evitar - cores específicas sem acessibilidade */
text-blue-700
text-red-600
text-green-600
```

## ✅ Padrões de Substituição

| ❌ Classe Antiga | ✅ Classe Acessível | Uso |
|------------------|-------------------|-----|
| `text-gray-500` | `text-accessible-text-secondary` | Texto auxiliar |
| `text-gray-700` | `text-accessible-text-primary` | Texto principal |
| `text-gray-800` | `text-accessible-text-primary` | Texto principal |
| `bg-gray-50` | `bg-accessible-bg-secondary` | Fundo claro |
| `bg-white` | `bg-accessible-bg-primary` | Fundo principal |
| `text-black` | `text-accessible-text-primary` | Texto principal |
| `text-blue-700` | `text-accessible-accent` | Links |
| `text-red-600` | `text-accessible-error` | Erros |
| `text-green-600` | `text-accessible-success` | Sucesso |

## 🎯 Casos de Uso Específicos

### 1. Textos de Carregamento
```tsx
// ❌ Não fazer
<p className="text-gray-500">Carregando...</p>

// ✅ Fazer
<p className="text-accessible-text-secondary">Carregando...</p>
```

### 2. Mensagens de Estado Vazio
```tsx
// ❌ Não fazer
<div className="text-gray-500">Nenhum item encontrado</div>

// ✅ Fazer
<div className="text-accessible-text-secondary">Nenhum item encontrado</div>
```

### 3. Links e Botões
```tsx
// ❌ Não fazer
<a className="text-blue-700 underline">Ver mais</a>

// ✅ Fazer
<a className="text-accessible-accent underline hover:text-accessible-accent-hover">Ver mais</a>
```

### 4. Cards e Containers
```tsx
// ❌ Não fazer
<div className="bg-gray-50 border border-gray-200">

// ✅ Fazer
<div className="bg-accessible-bg-secondary border border-accessible-border">
```

### 5. Estados de Erro
```tsx
// ❌ Não fazer
<span className="text-red-600">Campo obrigatório</span>

// ✅ Fazer
<span className="text-accessible-error">Campo obrigatório</span>
```

## 🔄 Comportamento dos Temas

### Modo Normal
- `bg-accessible-bg-primary` = branco (#ffffff)
- `text-accessible-text-primary` = preto (#1a202c)
- `text-accessible-accent` = azul (#3182ce)

### Modo Alto Contraste
- `bg-accessible-bg-primary` = preto (#000000)
- `text-accessible-text-primary` = branco (#ffffff)
- `text-accessible-accent` = amarelo (#ffde00)

## 🛠️ Para Desenvolvedores

### 1. Sempre verifique o contraste
```bash
# Use ferramentas como:
# - Lighthouse (Chrome DevTools)
# - axe DevTools
# - Color Contrast Analyzer
```

### 2. Teste nos dois temas
- Modo normal (claro)
- Modo alto contraste (escuro)

### 3. Classes permitidas de cores específicas
Apenas estas cores específicas devem ser mantidas para elementos que não mudam:
- `bg-custom-green` - Navegação lateral (sempre verde)
- `bg-custom-blue` - Botões secundários específicos
- `text-white` - Texto em fundos coloridos

## 📋 Checklist de Revisão

Antes de fazer commit, verifique:

- [ ] Nenhuma classe `text-gray-*` em textos principais
- [ ] Nenhuma classe `bg-gray-*` em containers principais  
- [ ] Links usam `text-accessible-accent`
- [ ] Mensagens de erro usam `text-accessible-error`
- [ ] Textos secundários usam `text-accessible-text-secondary`
- [ ] Testado em modo alto contraste
- [ ] Foco visível em todos os elementos interativos

## 🔍 Comandos de Verificação

```bash
# Encontrar usos de cores não acessíveis
grep -r "text-gray-\|bg-gray-\|text-black\|bg-white" src/

# Verificar se há cores hardcoded em estilos
grep -r "color:\|background:" src/
```

---

**Nota**: Este sistema garante que o projeto seja acessível para todos os usuários, incluindo aqueles que precisam de alto contraste ou usam tecnologias assistivas.