import {
    Bird,
    Book,
    Bot,
    Code2,
    CornerDownLeft,
    LifeBuoy,
    Mic,
    Paperclip,
    Rabbit,
    Settings,
    Settings2,
    Share,
    SquareTerminal,
    SquareUser,
    Triangle,
    Turtle,
    Hospital,
  } from "lucide-react"

  import { Badge } from "@/Components/ui/badge"
  import { Button } from "@/Components/ui/button"
  import {
    Drawer,
    DrawerContent,
    DrawerDescription,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
  } from "@/Components/ui/drawer"
  import { Input } from "@/Components/ui/input"
  import { Label } from "@/Components/ui/label"
  import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/Components/ui/select"
  import { Textarea } from "@/Components/ui/textarea"

  import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
    TooltipProvider,
  } from "@/Components/ui/tooltip"
import { Link } from "@inertiajs/react"

  export const description =
    "An AI playground with a sidebar navigation and a main content area. The playground has a header with a settings drawer and a share button. The sidebar has navigation links and a user menu. The main content area shows a form to configure the model and messages."

  export default function Dashboard() {
    return (
      <div className="grid h-screen w-full pl-[56px]">
        <aside className="inset-y fixed  left-0 z-20 flex h-full flex-col border-r">
          <div className="border-b p-2">
            <Button variant="outline" size="icon" aria-label="Home">
              <Triangle className="size-5 fill-foreground" />
              </Button>
          </div>
          <nav className="grid gap-1 p-2">

            <Link href='/' className="">
            <Button variant="outline" size="icon" aria-label="Home">
                <SquareTerminal className="size-5" />
                </Button>
            </Link>


          </nav>
        </aside>
      </div>
    )
  }
