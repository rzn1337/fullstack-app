import Button from "../components/Button"
import { PlusIcon } from "lucide-react"

function UserProfile() {
  return (
    <div className="flex flex-col h-full">
        <header className="bg-background border-b flex items-center justify-between px-6 py-4 shrink-0">
        <div className="flex items-center gap-4">
          
          <div className="grid gap-0.5">
            <div className="font-semibold">John Doe</div>
            <div className="text-sm text-muted-foreground">@johndoe</div>
          </div>
        </div>
        <Button variant="ghost" size="icon">
          <PlusIcon className="h-5 w-5" />
          <span className="sr-only">Create new whiteboard</span>
        </Button>
      </header>
    </div>
  )
}

export default UserProfile






/* 
import { Button } from "@/components/ui/button"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import Link from "next/link"
import { Card, CardContent, CardFooter } from "@/components/ui/card"

export default function Component() {
  return (
    <div className="flex flex-col h-full">
      <header className="bg-background border-b flex items-center justify-between px-6 py-4 shrink-0">
        <div className="flex items-center gap-4">
          
          <div className="grid gap-0.5">
            <div className="font-semibold">John Doe</div>
            <div className="text-sm text-muted-foreground">@johndoe</div>
          </div>
        </div>
        <Button variant="ghost" size="icon">
          <PlusIcon className="h-5 w-5" />
          <span className="sr-only">Create new whiteboard</span>
        </Button>
      </header>
      <main className="flex-1 bg-muted/40 p-6 grid gap-6 overflow-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          <Link href="#" className="group" prefetch={false}>
            <Card className="overflow-hidden">
              <CardContent className="p-0">
                <img
                  src="/placeholder.svg"
                  alt="Whiteboard thumbnail"
                  width={400}
                  height={300}
                  className="aspect-video object-cover group-hover:scale-105 transition-transform"
                />
              </CardContent>
              <CardFooter className="bg-background px-4 py-3">
                <div className="flex items-center justify-between">
                  <div className="grid gap-0.5">
                    <div className="font-medium">Whiteboard 1</div>
                    <div className="text-sm text-muted-foreground">Last updated: 2 days ago</div>
                  </div>
                  <Button variant="ghost" size="icon">
                    <MoveHorizontalIcon className="h-5 w-5" />
                    <span className="sr-only">More options</span>
                  </Button>
                </div>
              </CardFooter>
            </Card>
          </Link>
          <Link href="#" className="group" prefetch={false}>
            <Card className="overflow-hidden">
              <CardContent className="p-0">
                <img
                  src="/placeholder.svg"
                  alt="Whiteboard thumbnail"
                  width={400}
                  height={300}
                  className="aspect-video object-cover group-hover:scale-105 transition-transform"
                />
              </CardContent>
              <CardFooter className="bg-background px-4 py-3">
                <div className="flex items-center justify-between">
                  <div className="grid gap-0.5">
                    <div className="font-medium">Whiteboard 2</div>
                    <div className="text-sm text-muted-foreground">Last updated: 5 days ago</div>
                  </div>
                  <Button variant="ghost" size="icon">
                    <MoveHorizontalIcon className="h-5 w-5" />
                    <span className="sr-only">More options</span>
                  </Button>
                </div>
              </CardFooter>
            </Card>
          </Link>
          <Link href="#" className="group" prefetch={false}>
            <Card className="overflow-hidden">
              <CardContent className="p-0">
                <img
                  src="/placeholder.svg"
                  alt="Whiteboard thumbnail"
                  width={400}
                  height={300}
                  className="aspect-video object-cover group-hover:scale-105 transition-transform"
                />
              </CardContent>
              <CardFooter className="bg-background px-4 py-3">
                <div className="flex items-center justify-between">
                  <div className="grid gap-0.5">
                    <div className="font-medium">Whiteboard 3</div>
                    <div className="text-sm text-muted-foreground">Last updated: 1 week ago</div>
                  </div>
                  <Button variant="ghost" size="icon">
                    <MoveHorizontalIcon className="h-5 w-5" />
                    <span className="sr-only">More options</span>
                  </Button>
                </div>
              </CardFooter>
            </Card>
          </Link>
          <Link href="#" className="group" prefetch={false}>
            <Card className="overflow-hidden">
              <CardContent className="p-0">
                <img
                  src="/placeholder.svg"
                  alt="Whiteboard thumbnail"
                  width={400}
                  height={300}
                  className="aspect-video object-cover group-hover:scale-105 transition-transform"
                />
              </CardContent>
              <CardFooter className="bg-background px-4 py-3">
                <div className="flex items-center justify-between">
                  <div className="grid gap-0.5">
                    <div className="font-medium">Whiteboard 4</div>
                    <div className="text-sm text-muted-foreground">Last updated: 2 weeks ago</div>
                  </div>
                  <Button variant="ghost" size="icon">
                    <MoveHorizontalIcon className="h-5 w-5" />
                    <span className="sr-only">More options</span>
                  </Button>
                </div>
              </CardFooter>
            </Card>
          </Link>
          <Link href="#" className="group" prefetch={false}>
            <Card className="overflow-hidden">
              <CardContent className="p-0">
                <img
                  src="/placeholder.svg"
                  alt="Whiteboard thumbnail"
                  width={400}
                  height={300}
                  className="aspect-video object-cover group-hover:scale-105 transition-transform"
                />
              </CardContent>
              <CardFooter className="bg-background px-4 py-3">
                <div className="flex items-center justify-between">
                  <div className="grid gap-0.5">
                    <div className="font-medium">Whiteboard 5</div>
                    <div className="text-sm text-muted-foreground">Last updated: 1 month ago</div>
                  </div>
                  <Button variant="ghost" size="icon">
                    <MoveHorizontalIcon className="h-5 w-5" />
                    <span className="sr-only">More options</span>
                  </Button>
                </div>
              </CardFooter>
            </Card>
          </Link>
          <Link href="#" className="group" prefetch={false}>
            <Card className="overflow-hidden">
              <CardContent className="p-0">
                <img
                  src="/placeholder.svg"
                  alt="Whiteboard thumbnail"
                  width={400}
                  height={300}
                  className="aspect-video object-cover group-hover:scale-105 transition-transform"
                />
              </CardContent>
              <CardFooter className="bg-background px-4 py-3">
                <div className="flex items-center justify-between">
                  <div className="grid gap-0.5">
                    <div className="font-medium">Whiteboard 6</div>
                    <div className="text-sm text-muted-foreground">Last updated: 2 months ago</div>
                  </div>
                  <Button variant="ghost" size="icon">
                    <MoveHorizontalIcon className="h-5 w-5" />
                    <span className="sr-only">More options</span>
                  </Button>
                </div>
              </CardFooter>
            </Card>
          </Link>
        </div>
      </main>
    </div>
  )
}



function PlusIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M5 12h14" />
      <path d="M12 5v14" />
    </svg>
  )
} */