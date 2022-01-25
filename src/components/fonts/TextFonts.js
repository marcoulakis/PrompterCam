import React from 'react'
import { Text, StyleSheet, View, ActivityIndicator } from 'react-native'
import * as Font from 'expo-font'

import { LogBox } from 'react-native';
LogBox.ignoreLogs(['Warning: componentWillMount']); // Ignore log notification by message
//LogBox.ignoreAllLogs();//Ignore all log notifications

class TextModeseven extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            loading: true,
        }
    }

    async componentWillMount() {
        await Font.loadAsync({
            'Modeseven': require('../../../assets/fonts/Modeseven.otf'),
        })
        this.setState({ loading: false })
    }

    render() {
        const allProps = Object.assign({}, this.props);
        if (this.state.loading) {
            return <ActivityIndicator/>
        }
        const styleProps = allProps.style;
        delete allProps.style
            return ( 
                <Text style={[styles.Modeseven, styleProps]} {...allProps}>
                    {this.props.children}
                </Text>
            )
    }
}

class TextNotoSansTC900 extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            loading: true,
        }
    }

    async componentWillMount() {
        await Font.loadAsync({
            'NotoSansTC900': require('../../../assets/fonts/NotoSansTC-900-Bold.otf'),
        })
        this.setState({ loading: false })
    }

    render() {
        const allProps = Object.assign({}, this.props);
        if (this.state.loading) {
            return <ActivityIndicator/>
        }
        const styleProps = allProps.style;
        delete allProps.style
            return (
               
                    <Text style={[styles.NotoSansTC900, styleProps]} {...allProps}>
                        {this.props.children}
                    </Text>
                
            )
    }
}

class TextNotoSansTC700 extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            loading: true,
        }
    }

    async componentWillMount() {
        await Font.loadAsync({
            'NotoSansTC700': require('../../../assets/fonts/NotoSansTC-700-Bold.otf'),
        })
        this.setState({ loading: false })
    }

    render() {
        const allProps = Object.assign({}, this.props);
        if (this.state.loading) {
            return <ActivityIndicator/>
        }
        const styleProps = allProps.style;
        delete allProps.style
            return (
               
                    <Text style={[styles.NotoSansTC700, styleProps]} {...allProps}>
                        {this.props.children}
                    </Text>
                
            )
    }
}

class TextNotoSansTC500 extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            loading: true,
        }
    }

    async componentWillMount() {
        await Font.loadAsync({
            'NotoSansTC500': require('../../../assets/fonts/NotoSansTC-500-Regular.otf'),
        })
        this.setState({ loading: false })
    }

    render() {
        const allProps = Object.assign({}, this.props);
        if (this.state.loading) {
            return <ActivityIndicator/>
        }
        const styleProps = allProps.style;
        delete allProps.style
            return (
               
                    <Text style={[styles.NotoSansTC500, styleProps]} {...allProps} >
                        {this.props.children}
                    </Text>
                
            )
    }
}

class TextNotoSansTC300 extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            loading: true,
        }
    }

    async componentWillMount() {
        await Font.loadAsync({
            'NotoSansTC300': require('../../../assets/fonts/NotoSansTC-300-Regular.otf'),
        })
        this.setState({ loading: false })
    }

    render() {
        const allProps = Object.assign({}, this.props);
        if (this.state.loading) {
            return <ActivityIndicator/>
        }
        const styleProps = allProps.style;
        delete allProps.style
            return (
               
                    <Text style={[styles.NotoSansTC300, styleProps]} {...allProps}>
                        {this.props.children}
                    </Text>
                
            )
    }
}

class TextNotoSansTC100 extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            loading: true,
        }
    }

    async componentWillMount() {
        await Font.loadAsync({
            'NotoSansTC100': require('../../../assets/fonts/NotoSansTC-100-Regular.otf'),
        })
        this.setState({ loading: false })
    }

    render() {
        const allProps = Object.assign({}, this.props);
        if (this.state.loading) {
            return <ActivityIndicator/>
        }
        const styleProps = allProps.style;
        delete allProps.style
            return (
               
                    <Text style={[styles.NotoSansTC100, styleProps]} {...allProps}>
                        {this.props.children}
                    </Text>
                
            )
    }
}

class TextZillaSlabHighlight400 extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            loading: true,
        }
    }

    async componentWillMount() {
        await Font.loadAsync({
            'ZillaSlabHighlight400': require('../../../assets/fonts/ZillaSlabHighlight-400-Regular.otf'),
        })
        this.setState({ loading: false })
    }

    render() {
        const allProps = Object.assign({}, this.props);
        if (this.state.loading) {
            return <ActivityIndicator/>
        }
        const styleProps = allProps.style;
        delete allProps.style
            return (
               
                    <Text style={[styles.ZillaSlabHighlight400, styleProps]} {...allProps}>
                        {this.props.children}
                    </Text>
                
            )
    }
}

class TextZillaSlabHighlight700 extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            loading: true,
        }
    }

    async componentWillMount() {
        await Font.loadAsync({
            'ZillaSlabHighlight700': require('../../../assets/fonts/ZillaSlabHighlight-700-Bold.otf'),
        })
        this.setState({ loading: false })
    }

    render() {
        const allProps = Object.assign({}, this.props);
        if (this.state.loading) {
            return <ActivityIndicator/>
        }
        const styleProps = allProps.style;
        delete allProps.style
            return (
               
                    <Text style={[styles.ZillaSlabHighlight700, styleProps]} {...allProps}>
                        {this.props.children}
                    </Text>
                
            )
    }
}


class TextNotoSansTCThin extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            loading: true,
        }
    }

    async componentWillMount() {
        await Font.loadAsync({
            'NotoSansTCThin': require('../../../assets/fonts/NotoSansTC-Thin.otf'),
        })
        this.setState({ loading: false })
    }

    render() {
        const allProps = Object.assign({}, this.props);
        if (this.state.loading) {
            return <ActivityIndicator/>
        }
        const styleProps = allProps.style;
        delete allProps.style
            return (
               
                    <Text style={[styles.NotoSansTCThin, styleProps]} {...allProps}>
                        {this.props.children}
                    </Text>
                
            )
    }
}

const styles = StyleSheet.create({
    Modeseven:{
        fontFamily: 'Modeseven'
    },
    ZillaSlabHighlight700:{
        fontFamily: 'ZillaSlabHighlight700'
    },
    ZillaSlabHighlight400:{
        fontFamily: 'ZillaSlabHighlight400'
    },
    FoolsErrand: {
        fontFamily: 'FoolsErrand'
    },
    NotoSansTC900: {
        fontFamily: 'NotoSansTC900'
    },
    NotoSansTC700: {
        fontFamily: 'NotoSansTC700'
    },
    NotoSansTC500: {
        fontFamily: 'NotoSansTC500'
    },
    NotoSansTC300: {
        fontFamily: 'NotoSansTC300'
    },
    NotoSansTC100: {
        fontFamily: 'NotoSansTC100'
    },
    NotoSansTCThin: {
        fontFamily: 'NotoSansTCThin'
    },
})

export { TextModeseven, TextNotoSansTCThin, TextNotoSansTC100, TextNotoSansTC300, TextNotoSansTC500, TextNotoSansTC700, TextNotoSansTC900, TextZillaSlabHighlight700, TextZillaSlabHighlight400 }