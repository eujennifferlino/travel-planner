import { User, X } from "lucide-react";
import { FormEvent } from "react";
import { Button } from "../../components/button";
import { format } from "date-fns";
import { DateRange } from "react-day-picker";
import { ptBR } from "date-fns/locale";

interface ConfirmTripModalProps {
  closeConfirmTripModal: () => void;
  createTrip: (event: FormEvent<HTMLFormElement>) => void;
  setOwnerEmail: (email: string) => void;
  setOwnerName: (name: string) => void;
  destination: string;
  eventStartAndEndDates: DateRange | undefined;
}

export function ConfirmTripModal({
  closeConfirmTripModal,
  createTrip,
  setOwnerEmail,
  setOwnerName,
  destination,
  eventStartAndEndDates,
}: ConfirmTripModalProps) {
  const displayedDate =
    eventStartAndEndDates &&
    eventStartAndEndDates.from &&
    eventStartAndEndDates.to
      ? format(eventStartAndEndDates.from, "d' de 'LLL", { locale: ptBR })
          .concat(" até ")
          .concat(
            format(eventStartAndEndDates.to, "d' de 'LLL", { locale: ptBR })
          )
      : null;

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center">
      <div className="w-[640px] rounded-xl py-5 px-6 shadow-shape bg-zinc-900 space-y-5">
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <h2 className="font-lg font-semibold">
              Confirmar criação de viagem
            </h2>
            <button>
              <X
                className="size-5 text-zinc-400"
                onClick={closeConfirmTripModal}
              />
            </button>
          </div>

          <p className="text-sm text-zinc-400">
            Para concluir a criação da viagem para{" "}
            <span className="font-semibold text-zinc-100">{destination}</span>{" "}
            nas datas de{" "}
            <span className="font-semibold text-zinc-100">
              {displayedDate || "Selecionar datas"}
            </span>{" "}
            preencha seus dados abaixo:
          </p>
        </div>

        <form onSubmit={createTrip} className="space-y-3">
          <div className="h-14 px-4 bg-zinc-950 border border-zinc-800 rounded-lg flex items-center gap-2">
            <User className="text-zinc-400 size-5" />
            <input
              type="text"
              name="name"
              placeholder="Seu nome completo"
              className="bg-transparent text-lg placeholder-zinc-400 outline-none flex-1"
              onChange={(event) => setOwnerName(event.target.value)}
            />
          </div>

          <div className="h-14 px-4 bg-zinc-950 border border-zinc-800 rounded-lg flex items-center gap-2">
            <User className="text-zinc-400 size-5" />
            <input
              type="email"
              name="email"
              placeholder="Seu e-mail pessoal"
              className="bg-transparent text-lg placeholder-zinc-400 outline-none flex-1"
              onChange={(event) => setOwnerEmail(event.target.value)}
            />
          </div>

          <Button type="submit" size="full">
            Confirmar criação da viagem
          </Button>
        </form>
      </div>
    </div>
  );
}
