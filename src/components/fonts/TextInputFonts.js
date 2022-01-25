import React from 'react'
import { TextInput, StyleSheet, View, ActivityIndicator } from 'react-native'
import * as Font from 'expo-font'


class TextInputNotoSansTC900 extends React.Component {
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
                <TextInput style={[styles.NotoSansTC900, styleProps]} {...allProps}>
                    {this.props.children}
                </TextInput>
            )
    }
}

class TextInputNotoSansTC700 extends React.Component {
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
                
                    <TextInput style={[styles.NotoSansTC700, styleProps]} {...allProps}>
                        {this.props.children}
                    </TextInput>
                
            )
    }
}

class TextInputNotoSansTC500 extends React.Component {
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
                
                    <TextInput style={[styles.NotoSansTC500, styleProps]} {...allProps}>
                        {this.props.children}
                    </TextInput>
                
            )
    }
}

class TextInputNotoSansTC300 extends React.Component {
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
                
                    <TextInput style={[styles.NotoSansTC300, styleProps]} {...allProps}
                    ref={input => allProps.inputRef && allProps.inputRef(input)}
                    blurOnSubmit= {allProps.blurOnSubmit}
                    onSubmitEditing = {allProps.onSubmitEditing}
                    returnKeyType = {allProps.returnKeyType}
                    onFocus = {allProps.onFocus}
                    autoCapitalize="none"
                    editable={allProps.editable}
                    onChangeText={allProps.onChangeText}
                    keyboardType={allProps.keyboardType}
                    >
                        {this.props.children} 
                    </TextInput>
                
            )
    }
}

class TextInputNotoSansTC100 extends React.Component {
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
                
                    <TextInput style={[styles.NotoSansTC100, styleProps]} {...allProps}>
                        {this.props.children}
                    </TextInput>
                
            )
    }
}

class TextInputNotoSansTCThin extends React.Component {
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
                
                    <TextInput style={[styles.NotoSansTCThin, styleProps]} {...allProps}>
                        {this.props.children}
                    </TextInput>
                
            )
    }
}


const styles = StyleSheet.create({
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

export { TextInputNotoSansTCThin, TextInputNotoSansTC100, TextInputNotoSansTC300, TextInputNotoSansTC500, TextInputNotoSansTC700, TextInputNotoSansTC900 }