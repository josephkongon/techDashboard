import {createContext, useContext, useCallback, useEffect, useMemo, useState} from 'react'
import {
    LayoutModeType,
    LayoutOffcanvasStatesType,
    LayoutOrientationType,
    LayoutState,
    LayoutType,
    MenuType,
    OffcanvasControlType,
    LayoutThemeType,
    TopBarThemeType, LayoutWidthType, IconMenuThemeType,
} from '@/types/layout'

import useLocalStorage from '@/hooks/useLocalStorage'

import {ChildrenType} from '@/types/component-props'
import {toggleDocumentAttribute} from '@/utils/layout'

const ThemeContext = createContext<LayoutType | undefined>(undefined)

const useLayoutContext = () => {
    const context = useContext(ThemeContext)
    if (!context) {
        throw new Error('useLayoutContext can only be used within LayoutProvider')
    }
    return context
}

const LayoutProvider = ({children}: ChildrenType) => {

    const INIT_STATE: LayoutState = {
        theme: 'light',
        orientation: 'vertical',
        mode: 'fluid',
        width: "fluid",
        topBar: {theme: 'light'},
        menu: {
            theme: 'light',
            size: 'default',
            position: 'fixed'
        },
        twoColumn: {
            iconMenuTheme: "light"
        },
        showTwoToneIcons: false,
        showUserInfo: false
    }

    const [settings, setSettings] = useLocalStorage<LayoutState>('__UBOLD_CONFIG__', INIT_STATE)

    const [offcanvasStates, setOffcanvasStates] = useState<LayoutOffcanvasStatesType>({
        showThemeCustomizer: false,
        showHorizontalMenu: false,
        showBackdrop: false,
    })

    const updateSettings = (_newSettings: Partial<LayoutState>) => setSettings({...settings, ..._newSettings})

    const changeTheme = (newTheme: LayoutThemeType) => {
        updateSettings({theme: newTheme})
    }

    const changeLayoutMode = (newMode: LayoutModeType) => {
        updateSettings({mode: newMode})
    }

    const changeLayoutOrientation = (newOrientation: LayoutOrientationType) => {
        updateSettings({orientation: newOrientation})
    }

    const changeLayoutWidth = (newWidth: LayoutWidthType) => {
        updateSettings({width: newWidth})
    }

    const changeTopBarTheme = (newTheme: TopBarThemeType) => {
        updateSettings({topBar: {theme: newTheme}})
    }

    const changeMenuTheme = (newTheme: MenuType['theme']) => {
        updateSettings({menu: {...settings.menu, theme: newTheme}})
    }

    const changeMenuSize = (newSize: MenuType['size']) => {
        updateSettings({menu: {...settings.menu, size: newSize}})
    }

    const changeMenuPosition = (newPosition: MenuType['position']) => {
        updateSettings({menu: {...settings.menu, position: newPosition}})
    }

    const changeIconMenuTheme = (newTheme: IconMenuThemeType) => {
        updateSettings({twoColumn: {iconMenuTheme: newTheme}})
    }

    const toggleTwoToneIcons = () => {
        updateSettings({showTwoToneIcons: !settings.showTwoToneIcons})
    }

    const toggleUserInfo = () => {
        updateSettings({showUserInfo: !settings.showUserInfo})
    }

    const toggleThemeCustomizer: OffcanvasControlType['toggle'] = () => {
        setOffcanvasStates({...offcanvasStates, showThemeCustomizer: !offcanvasStates.showThemeCustomizer})
    }

    const toggleHorizontalMenu: OffcanvasControlType['toggle'] = () => {
        setOffcanvasStates({...offcanvasStates, showHorizontalMenu: !offcanvasStates.showHorizontalMenu})
    }

    const themeCustomizer: LayoutType['themeCustomizer'] = {
        open: offcanvasStates.showThemeCustomizer,
        toggle: toggleThemeCustomizer,
    }

    const horizontalMenu: LayoutType['horizontalMenu'] = {
        open: offcanvasStates.showHorizontalMenu,
        toggle: toggleHorizontalMenu,
    }

    // toggle backdrop
    const toggleBackdrop = useCallback(() => {
        const htmlTag = document.getElementsByTagName('html')[0]
        if (offcanvasStates.showBackdrop) htmlTag.classList.remove('sidebar-enable')
        else htmlTag.classList.add('sidebar-enable')
        setOffcanvasStates({...offcanvasStates, showBackdrop: !offcanvasStates.showBackdrop})
    }, [offcanvasStates.showBackdrop])

    useEffect(() => {
        toggleDocumentAttribute('data-bs-theme', settings.theme)
        toggleDocumentAttribute('data-topbar-color', settings.topBar.theme)
        toggleDocumentAttribute('data-menu-color', settings.menu.theme)
        toggleDocumentAttribute('data-sidenav-size', settings.menu.size)
        toggleDocumentAttribute('data-layout-mode', settings.mode)
        toggleDocumentAttribute('data-layout', settings.orientation)
        toggleDocumentAttribute('data-two-column-color', settings.twoColumn.iconMenuTheme)

        return () => {
            toggleDocumentAttribute('data-bs-theme', settings.theme, true)
            toggleDocumentAttribute('data-topbar-color', settings.topBar.theme, true)
            toggleDocumentAttribute('data-sidenav-size', settings.menu.theme, true)
            toggleDocumentAttribute('data-layout-mode', settings.mode, true)
            toggleDocumentAttribute('data-layout', settings.orientation, true)
            toggleDocumentAttribute('data-two-column-color', settings.twoColumn.iconMenuTheme, true)
        }
    }, [settings])

    const resetSettings = () => updateSettings(INIT_STATE)

    return (
        <ThemeContext.Provider
            value={useMemo(
                () => ({
                    ...settings,
                    horizontalMenu,
                    changeTheme,
                    changeLayoutMode,
                    changeLayoutOrientation,
                    changeLayoutWidth,
                    changeTopBarTheme,
                    changeMenuTheme,
                    changeMenuSize,
                    changeMenuPosition,
                    changeIconMenuTheme,
                    toggleTwoToneIcons,
                    toggleUserInfo,
                    themeCustomizer,
                    toggleBackdrop,
                    resetSettings,
                }),
                [settings, offcanvasStates],
            )}>
            {children}
            {offcanvasStates.showBackdrop && <div className="offcanvas-backdrop fade show" onClick={toggleBackdrop}/>}
        </ThemeContext.Provider>
    )
}

export {LayoutProvider, useLayoutContext}
