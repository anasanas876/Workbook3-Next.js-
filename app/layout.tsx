import Link from 'next/link'
function SideBar(){
    return <div>
        <Link href="/login">Go to Login Page</Link>
        <Link href="/dashboard">Go to Dashboard Page</Link>
    </div>
}
export default SideBar