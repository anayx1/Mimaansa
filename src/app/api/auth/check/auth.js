import { useEffect } from "react"
import { useRouter } from "next/navigation"

export default function useAdminAuth() {
    const router = useRouter()

    useEffect(() => {
        async function verify() {
            const res = await fetch("/auth/check")
            const { authenticated } = await res.json()
            if (!authenticated) {
                router.push("/login")
            }
        }
        verify()
    }, [router])
}
