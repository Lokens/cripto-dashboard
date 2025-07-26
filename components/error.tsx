export default function ErrorMessage({ message = "Erro ao carregar dados." }: { message?: string }) {
    return (
      <div className="flex items-center justify-center h-64 text-red-600 text-lg">
        {message}
      </div>
    );
  }
  