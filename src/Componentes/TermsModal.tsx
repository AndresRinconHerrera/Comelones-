import React from 'react';

interface TermsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const TermsModal: React.FC<TermsModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm">
      <div className="relative max-h-[85vh] w-full max-w-2xl overflow-y-auto rounded-2xl bg-neutral-900 p-6 text-neutral-100 shadow-2xl border border-neutral-800">
        
        {/* Botón para cerrar */}
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 rounded-full bg-neutral-800 p-2 text-neutral-400 hover:text-white transition-colors cursor-pointer"
        >
          ✕
        </button>

        <h2 className="text-2xl font-bold text-amber-500 mb-4">Términos, Condiciones y Tratamiento de Datos</h2>
        
        <div className="space-y-4 text-sm text-neutral-300 leading-relaxed">
          <h3 className="font-semibold text-white text-base mt-2">1. Términos y Condiciones Generales</h3>
          <p>
            Bienvenido al sistema de pedidos en línea. Al realizar un pedido en nuestra plataforma digital, aceptas los precios expresados en pesos colombianos, los horarios operativos nocturnos y las condiciones de entrega a domicilio.
          </p>

          <h3 className="font-semibold text-white text-base mt-2">2. Política de Privacidad y Tratamiento de Datos (Ley 1581 de 2012)</h3>
          <p>
            En cumplimiento de la normatividad colombiana de protección de datos personales, te informamos que los datos suministrados (nombre, teléfono y dirección) son recolectados y almacenados exclusivamente para la gestión, despacho y seguimiento de tus pedidos, así como para establecer comunicación directa vía WhatsApp o llamada en caso de requerirlo.
          </p>
          <p>
            Como titular de los datos, tienes derecho a conocer, actualizar, rectificar o solicitar la supresión de tu información en cualquier momento a través de nuestros canales oficiales.
          </p>

          <h3 className="font-semibold text-white text-base mt-2">3. Métodos de Pago y Envíos</h3>
          <p>
            Los pagos se efectúan mediante transferencias electrónicas habilitadas (Nequi, Bancolombia) o pago contra entrega. Los costos de domicilio se calculan e incluyen al finalizar el proceso de compra.
          </p>
        </div>

        <div className="mt-6 flex justify-end">
          <button
            onClick={onClose}
            className="rounded-xl bg-amber-500 px-6 py-2 font-semibold text-neutral-950 hover:bg-amber-400 transition-colors cursor-pointer"
          >
            Entendido
          </button>
        </div>
      </div>
    </div>
  );
};