import clsx from "clsx"
import { createContext, useContext } from "react"
import { ActivityIndicator, Text, TouchableOpacity, TouchableOpacityProps } from "react-native"
import { TextProps } from "react-native-svg"

type Variants = "primary" | "secondary"

type ButtonProps = TouchableOpacityProps & {
  variant?: Variants
  isLoading?: boolean
}

const ThemeContext = createContext<{variant?: Variants}>({})

function Button({ variant = "primary", children, isLoading, ...props }: ButtonProps) {
  return (
    <TouchableOpacity 
    className={clsx(
      "w-full h-11 flex-row items-center justify-center rounded-lg gap-2",
      {
        "bg-lime-300": variant === "primary",
        "bg-zinc-800": variant === "secondary"
      }
    )}
    activeOpacity={0.7}
    disabled={isLoading}
    {...props}
    >
      <ThemeContext.Provider value={{ variant }}>
        {isLoading ? <ActivityIndicator className="text-lime-950"/> : children}
      </ThemeContext.Provider>
    </TouchableOpacity>
  )
}

function Title({ children }: TextProps) {
  const { variant } = useContext(ThemeContext)

  return ( 
    <Text className={clsx("", 
      {
        "text-lime-950": variant === "primary", 
        "text-zinc-200": variant === 'secondary'
      }
    )}
    >
      { children }
    </Text>
  )
}

Button.Title = Title

export { Button } 