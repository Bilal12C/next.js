"use client"
import Link from "next/link"
import Image from "next/image"
import logo from '../public/assets/images/logo.svg'
import { useState, useEffect } from "react"
import { signIn, signOut, useSession, getProviders } from 'next-auth/react'
function Nav() {

  const { data, status } = useSession();
  const [providers, setProviders] = useState(null)
  const [toggleDrodown, setToggleDropdown] = useState(false)

  useEffect(() => {
    const SetupProvider = async () => {
      const response = await getProviders();
      if (response) {
        setProviders(response)
      }
    }
    SetupProvider();
  }, [])



  useEffect(() => {
    console.log(data)
  }, [data])

  return (
    <nav className="flex-between w-full mb-16 pt-3">
      <Link href={'/'} className="flex gap-2 flex-center">
        <Image
          src={logo}
          width={30}
          alt="MainLogo"
          height={20}
          className="object-contain"
        />
        <p className="logo_text">Promptpia</p>
      </Link>

      {/* Desktop Navaigation */}
      <div className="sm:flex hidden">
        {
          status == 'authenticated' ? (
            <div className="flex gap-3 md:gap-5">
              <Link href={'/create-prompt'} className="black_btn">
                create Posts
              </Link>
              <button type="button" onClick={() => signOut()} className="outline_btn">
                Sign out
              </button>
              <Link href={'/profile'}>
                <Image
                  src={data?.image}
                  width={37}
                  height={37}
                  alt="Profile Image"
                  className="rounded-full"
                />
              </Link>
            </div>
          ) : (
            <>
              {
                providers && Object.values(providers).map((provider) => (
                  <button
                    type="button"
                    key={provider.name}
                    onClick={() => signIn(provider.id)}
                    className="black_btn"
                  >
                    Sign In
                  </button>
                )
                )
              }
            </>
          )
        }
      </div>

      {/* Mobile Navigation */}
      <div className="sm:hidden flex relative">
        {
          status == 'authenticated' ? (
            <div className="flex">
              <Image
                src={data.image}
                width={37}
                height={37}
                alt="Profile Image"
                className="rounded-full"
                onClick={() => setToggleDropdown((pre) => !pre)}
              />
              {toggleDrodown ? (
                <div className="dropdown">
                  <Link
                    href={'/profile'}
                    onClick={() => setToggleDropdown(false)}
                    className="dropdown_item"
                  >
                    My Profile
                  </Link>
                  <Link
                    href={'/create-prompt'}
                    onClick={() => setToggleDropdown(false)}
                    className="dropdown_item"
                  >
                    Create Prompt
                  </Link>
                  <button type="button" onClick={() => {
                    setToggleDropdown(false)
                    signOut()
                  }} className="mt-5 w-full black_btn">
                    Sign out
                  </button>
                </div>
              )
                : null
              }
            </div>
          ) : (
            <>
              {
                providers && Object.values(providers).map((provider) => {
                  <button
                    type="button"
                    key={provider.name}
                    onClick={() => signIn(provider.id)}
                    className="black_btn"
                  >
                    Sign In
                  </button>
                })
              }
            </>
          )
        }
      </div>
    </nav>
  )
}

export default Nav