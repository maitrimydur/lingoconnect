import { NavLink } from 'react-router-dom'
import { HomeIcon, ListIcon, InfoIcon, GearIcon } from './icons'

const TABS = [
  { to: '/home', icon: HomeIcon, label: 'Home' },
  { to: '/videos', icon: ListIcon, label: 'Videos' },
  { to: '/about', icon: InfoIcon, label: 'About' },
  { to: '/settings', icon: GearIcon, label: 'Settings' },
]

export default function BottomNav() {
  return (
    <nav className="sticky bottom-0 inset-x-0 border-t border-slate-200 bg-white/95 backdrop-blur px-6 py-3">
      <div className="max-w-sm mx-auto w-full flex items-center justify-between">
        {TABS.map(({ to, icon: Icon, label }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) =>
              `flex flex-col items-center gap-1 text-xs ${
                isActive ? 'text-slate-900' : 'text-slate-400'
              }`
            }
          >
            <Icon className="w-6 h-6" />
            <span>{label}</span>
          </NavLink>
        ))}
      </div>
    </nav>
  )
}
