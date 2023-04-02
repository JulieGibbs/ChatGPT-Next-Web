import { SubmitKey } from "../store/app";
import type { LocaleType } from "./index";

const es: LocaleType = {
  WIP: "En construcción...",
  Error: {
    Unauthorized:
      "Acceso no autorizado, por favor ingrese el código de acceso en la página de configuración.",
  },
  ChatItem: {
    ChatItemCount: (count: number) => `${count} mensajes`,
  },
  Chat: {
    SubTitle: (count: number) => `${count} mensajes con ChatGPT`,
    Actions: {
      ChatList: "Ir a la lista de chats",
      CompressedHistory: "Historial de memoria comprimido",
      Export: "Exportar todos los mensajes como Markdown",
      Copy: "Copiar",
      Stop: "Detener",
      Retry: "Reintentar",
    },
    Rename: "Renombrar chat",
    Typing: "Escribiendo...",
    Input: (submitKey: string) => {
      var inputHints = `Escribe algo y presiona ${submitKey} para enviar`;
      if (submitKey === String(SubmitKey.Enter)) {
        inputHints += ", presiona Shift + Enter para nueva línea";
      }
      return inputHints;
    },
    Send: "Enviar",
  },
  Export: {
    Title: "Todos los mensajes",
    Copy: "Copiar todo",
    Download: "Descargar",
  },
  Memory: {
    Title: "Historial de memoria",
    EmptyContent: "Aún no hay nada.",
    Copy: "Copiar todo",
  },
  Home: {
    NewChat: "Nuevo chat",
    DeleteChat: "¿Confirmar eliminación de la conversación seleccionada?",
  },
  Settings: {
    Title: "Configuración",
    SubTitle: "Todas las configuraciones",
    Actions: {
      ClearAll: "Borrar todos los datos",
      ResetAll: "Restablecer todas las configuraciones",
      Close: "Cerrar",
    },
    Lang: {
      Name: "Language",
      Options: {
        cn: "简体中文",
        en: "Inglés",
        tw: "繁體中文",
        es: "Español",
      },
    },
    Avatar: "Avatar",
    FontSize: {
      Title: "Tamaño de fuente",
      SubTitle: "Ajustar el tamaño de fuente del contenido del chat",
    },
    Update: {
      Version: (x: string) => `Versión: ${x}`,
      IsLatest: "Última versión",
      CheckUpdate: "Buscar actualizaciones",
      IsChecking: "Buscando actualizaciones...",
      FoundUpdate: (x: string) => `Se encontró una nueva versión: ${x}`,
      GoToUpdate: "Actualizar",
    },
    SendKey: "Tecla de envío",
    Theme: "Tema",
    TightBorder: "Borde ajustado",
    Prompt: {
      Disable: {
        Title: "Desactivar autocompletado",
        SubTitle: "Escribe / para activar el autocompletado",
      },
      List: "Lista de autocompletado",
      ListCount: (builtin: number, custom: number) =>
        `${builtin} incorporado, ${custom} definido por el usuario`,
      Edit: "Editar",
    },
    HistoryCount: {
      Title: "Cantidad de mensajes adjuntos",
      SubTitle: "Número de mensajes enviados adjuntos por solicitud",
    },
    CompressThreshold: {
      Title: "Umbral de compresión de historial",
      SubTitle:
        "Se comprimirán los mensajes si la longitud de los mensajes no comprimidos supera el valor",
    },
    Token: {
      Title: "Clave de API",
      SubTitle: "Utiliza tu clave para ignorar el límite de código de acceso",
      Placeholder: "Clave de la API de OpenAI",
    },
    Usage: {
      Title: "Saldo de la cuenta",
      SubTitle(granted: any, used: any) {
        return `Total $${granted}, Usado $${used}`;
      },
      IsChecking: "Comprobando...",
      Check: "Comprobar de nuevo",
    },
    AccessCode: {
      Title: "Código de acceso",
      SubTitle: "Control de acceso habilitado",
      Placeholder: "Necesita código de acceso",
    },
    Model: "Modelo",
    Temperature: {
      Title: "Temperatura",
      SubTitle: "Un valor mayor genera una salida más aleatoria",
    },
    MaxTokens: {
      Title: "Máximo de tokens",
      SubTitle: "Longitud máxima de tokens de entrada y tokens generados",
    },
    PresencePenlty: {
      Title: "Penalización de presencia",
      SubTitle:
        "Un valor mayor aumenta la probabilidad de hablar sobre nuevos temas",
    },
  },
  Store: {
    DefaultTopic: "Nueva conversación",
    BotHello: "¡Hola! ¿Cómo puedo ayudarte hoy?",
    Error: "Algo salió mal, por favor intenta nuevamente más tarde.",
    Prompt: {
      History: (content: string) =>
        "Este es un resumen del historial del chat entre la IA y el usuario como recapitulación: " +
        content,
      Topic:
        "Por favor, genera un título de cuatro a cinco palabras que resuma nuestra conversación sin ningún inicio, puntuación, comillas, puntos, símbolos o texto adicional. Elimina las comillas que lo envuelven.",
      Summarize:
        "Resuma nuestra discusión brevemente en 50 caracteres o menos para usarlo como un recordatorio para futuros contextos.",
    },
    ConfirmClearAll:
      "¿Confirmar para borrar todos los datos de chat y configuración?",
  },
  Copy: {
    Success: "Copiado al portapapeles",
    Failed:
      "La copia falló, por favor concede permiso para acceder al portapapeles",
  },
};

export default es;
