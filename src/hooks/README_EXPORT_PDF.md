# Hook de Exportação de PDF - useExportPDF

## 📄 Descrição

Hook customizado para exportar resumos de projetos em formato PDF com formatação profissional.

## 🚀 Funcionalidades

- ✅ Exportação de resumo completo do projeto
- ✅ Estatísticas gerais e por tema
- ✅ Barra de progresso visual
- ✅ Listagem de requisitos com status
- ✅ Inclusão de evidências (opcional)
- ✅ Informação sobre anexos
- ✅ Paginação automática
- ✅ Formatação profissional com cores
- ✅ Rodapé com numeração de páginas

## 📦 Dependências

```bash
yarn add jspdf html2canvas
yarn add -D @types/jspdf
```

## 💻 Uso

### Importação

```typescript
import { useExportPDF } from '../hooks/useExportPDF';
```

### Exemplo Básico

```typescript
const MeuComponente: React.FC = () => {
  const { exportProjectSummary } = useExportPDF();
  const [projeto, setProjeto] = useState<Projeto | null>(null);

  const handleExport = async () => {
    if (!projeto) return;
    
    const result = await exportProjectSummary(projeto);
    
    if (result.success) {
      console.log('PDF gerado:', result.fileName);
    }
  };

  return (
    <button onClick={handleExport}>
      Exportar PDF
    </button>
  );
};
```

### Exemplo com Opções

```typescript
const handleExport = async () => {
  const result = await exportProjectSummary(projeto, {
    includeEvidence: true,  // Incluir evidências
    includeStats: true      // Incluir estatísticas
  });
};
```

## ⚙️ Opções de Exportação

| Opção | Tipo | Padrão | Descrição |
|-------|------|--------|-----------|
| `includeEvidence` | `boolean` | `true` | Incluir evidências dos requisitos |
| `includeStats` | `boolean` | `true` | Incluir estatísticas gerais |

## 📊 Estrutura do PDF Gerado

1. **Cabeçalho**
   - Título "Resumo do Projeto"
   - Fundo azul

2. **Informações Gerais**
   - Nome do projeto
   - Data de geração
   - Total de temas

3. **Estatísticas Gerais** (se habilitado)
   - Total de requisitos
   - Requisitos concluídos
   - Requisitos pendentes
   - Barra de progresso visual
   - Porcentagem geral

4. **Detalhamento por Temas**
   - Nome do tema
   - Estatísticas do tema
   - Lista de requisitos com:
     - Status (✓ concluído ou ○ pendente)
     - Nome do requisito
     - Evidência (se habilitado)
     - Número de anexos

5. **Rodapé**
   - Numeração de páginas

## 🎨 Cores e Formatação

### Cores de Status
- 🔴 Vermelho: < 40% concluído
- 🟡 Amarelo: 40% - 90% concluído
- 🟢 Verde: > 90% concluído

### Símbolos
- ✓ Requisito concluído
- ○ Requisito pendente

## 🔧 Implementação no Dashboard

O botão de exportação já está implementado no Dashboard:

```tsx
<Button
  onClick={handleExportPDF}
  disabled={isExporting || !projeto}
>
  {isExporting ? 'Gerando PDF...' : '📄 Exportar Resumo (PDF)'}
</Button>
```

## 📝 Retorno da Função

```typescript
interface ExportResult {
  success: boolean;
  fileName?: string;
  error?: any;
}
```

## 🐛 Tratamento de Erros

```typescript
const handleExport = async () => {
  try {
    const result = await exportProjectSummary(projeto);
    
    if (result.success) {
      // Sucesso
    } else {
      // Erro
      console.error('Erro:', result.error);
    }
  } catch (error) {
    console.error('Erro ao exportar:', error);
  }
};
```

## 📄 Nome do Arquivo Gerado

Formato: `resumo-{nome-do-projeto}-{timestamp}.pdf`

Exemplo: `resumo-projeto-tcc-1732723456789.pdf`

## 🎯 Melhorias Futuras

- [ ] Adicionar gráficos de progresso
- [ ] Incluir imagens das evidências
- [ ] Exportar em diferentes formatos (Excel, Word)
- [ ] Customizar layout e cores
- [ ] Adicionar logotipo da empresa
- [ ] Incluir assinatura digital
- [ ] Gerar relatórios comparativos
