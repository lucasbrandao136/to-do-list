/**
 * Faz upload de imagem para o Cloudinary (versão simplificada)
 * @param file - Arquivo de imagem para upload
 * @returns URL segura da imagem no Cloudinary
 * @throws Error se o upload falhar
 */
export async function uploadImageToCloudinary(file: File): Promise<string> {
  // Validação básica do arquivo
  if (!file?.type?.startsWith('image/')) {
    throw new Error('Por favor, selecione uma imagem válida');
  }

  const formData = new FormData();
  formData.append('file', file);
  formData.append('upload_preset', 'unsigned');

  try {
    const response = await fetch(
      'https://api.cloudinary.com/v1_1/drmsafzun/image/upload',
      { method: 'POST', body: formData }
    );

    const data = await response.json();
    
    if (!response.ok || !data.secure_url) {
      throw new Error(data.error?.message || 'Falha no upload da imagem');
    }

    return data.secure_url;
  } catch (error) {
    console.error('Erro no upload:', error);
    throw new Error(
      error instanceof Error ? error.message : 'Erro ao enviar imagem'
    );
  }
}