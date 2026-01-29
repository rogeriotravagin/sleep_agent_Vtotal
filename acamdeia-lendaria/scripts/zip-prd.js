import fs from 'fs';
import path from 'path';
import archiver from 'archiver';
import { fileURLToPath } from 'url';

// Setup __dirname for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.join(__dirname, '..');

const output = fs.createWriteStream(path.join(rootDir, 'prd-studio-module.zip'));
const archive = archiver('zip', {
  zlib: { level: 9 } // Sets the compression level.
});

output.on('close', function() {
  console.log('📦 Arquivo prd-studio-module.zip criado com sucesso!');
  console.log(`📊 Total: ${archive.pointer()} bytes`);
  console.log('👉 Você pode baixar este arquivo na raiz do projeto.');
});

archive.on('warning', function(err) {
  if (err.code === 'ENOENT') {
    console.warn(err);
  } else {
    throw err;
  }
});

archive.on('error', function(err) {
  throw err;
});

archive.pipe(output);

console.log('🔄 Iniciando compactação do módulo PRD Studio...');

// 1. Core Templates
const templatesDir = path.join(rootDir, 'components', 'templates');
const prdFiles = [
    'PrdArchitectureTemplate.tsx',
    'PrdStudioTemplate.tsx',
    'PrdProjectDetailTemplate.tsx',
    'PrdStoryDetailTemplate.tsx',
    'PrdUploadTemplate.tsx',
    'PrdAnalysisTemplate.tsx',
    'PrdResearchTemplate.tsx',
    'PrdBriefTemplate.tsx',
    'PrdSpecTemplate.tsx',
    'PrdPlanTemplate.tsx',
    'PrdExportTemplate.tsx'
];

prdFiles.forEach(file => {
    const filePath = path.join(templatesDir, file);
    if (fs.existsSync(filePath)) {
        archive.file(filePath, { name: `components/templates/${file}` });
    } else {
        console.warn(`⚠️ Arquivo não encontrado: ${file}`);
    }
});

// 2. Configuration & Types
archive.file(path.join(rootDir, 'types.ts'), { name: 'types.ts' });
archive.file(path.join(rootDir, 'components/Sidebar.tsx'), { name: 'components/Sidebar.tsx' });

// 3. UI Dependencies (Optional - Adding core ones used in PRD)
const uiDir = path.join(rootDir, 'components', 'ui');
const uiComponents = [
    'button.tsx', 'card.tsx', 'input.tsx', 'badge.tsx', 'icon.tsx', 
    'progress.tsx', 'tabs.tsx', 'accordion.tsx', 'scroll-area.tsx',
    'separator.tsx', 'table.tsx', 'sheet.tsx', 'dialog.tsx',
    'autosize-textarea.tsx', 'file-upload.tsx', 'checkbox.tsx', 'select.tsx',
    'code-block.tsx'
];

uiComponents.forEach(file => {
    const filePath = path.join(uiDir, file);
    if (fs.existsSync(filePath)) {
        archive.file(filePath, { name: `components/ui/${file}` });
    }
});

// 4. Instructions
archive.append(
`# PRD Studio Module

Este pacote contém todos os arquivos fonte do módulo PRD Studio.

## Instalação

1. Copie a pasta 'components' para a raiz do seu projeto Next.js ou React.
2. Certifique-se de ter as dependências do Shadcn UI e Tailwind instaladas.
3. Adicione as rotas ao seu App.tsx ou router principal.

## Dependências
- lucide-react (ou flaticon wrapper)
- tailwind-merge
- clsx
- @radix-ui/react-* (conforme componentes UI)`, 
{ name: 'README_PRD.md' }
);

archive.finalize();