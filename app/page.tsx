import {
  OrganizationSwitcher,
  Show,
  SignInButton,
  UserButton,
} from "@clerk/nextjs"

export default function Page() {
  return (
    <main className="flex min-h-screen flex-col items-start gap-4 p-6">
      <Show when="signed-in" fallback={<SignInButton />}>
        <UserButton />
        <OrganizationSwitcher />
      </Show>
    </main>
  )
}
