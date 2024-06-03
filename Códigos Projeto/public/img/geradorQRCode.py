import qrcode
from PIL import Image

def generate_qr_code_with_logo(data, logo_path, output_path, qr_size=290, logo_size_ratio=0.3):
    # Gerar o QR code
    qr = qrcode.QRCode(
        version=1,
        error_correction=qrcode.constants.ERROR_CORRECT_H,
        box_size=10,
        border=4,
    )
    qr.add_data(data)
    qr.make(fit=True)

    # Criar a imagem do QR code
    qr_img = qr.make_image(fill_color="#597cff", back_color="white").convert('RGB')

    # Abrir a imagem do logo
    logo = Image.open(logo_path)

    # Calcular o tamanho do logo e redimensionar
    logo_size = int(qr_size * logo_size_ratio)
    logo = logo.resize((logo_size, logo_size), Image.Resampling.LANCZOS)

    # Calcular a posição do logo no centro do QR code
    qr_width, qr_height = qr_img.size
    logo_position = ((qr_width - logo_size) // 2, (qr_height - logo_size) // 2)

    # Colocar o logo no centro do QR code

    # Salvar a imagem final
    qr_img.save(output_path)

# Dados para o QR code
data = r"https://github.com/ExtraProjects860/DevWebProject"
# Caminho da imagem do logo
logo_path = r"public/img/Ponto_2.png"
# Caminho do arquivo de saída
output_path = "qr_code_with_logo.png"

generate_qr_code_with_logo(data, logo_path, output_path)
