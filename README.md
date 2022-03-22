# react-native-useonline
## React Native online status hook

A hook that reflects whether the device is online (is connected to the internet).
<br>
Works with expo! ✌️

The ```useOnline``` hook updates on both event triggers and an interval.
<br>
The hook pings a website/endpoint and if the server responds with 200 the hook will return true. 

## Installation

```bash
npm install react-native-useonline
```

## Usage

```typescript
import React from "react";
import {
    View,
    Text
} from "react-native";
import useOnline from "react-native-useonline";

const App = () => {
    const online = useOnline();

    return (
        <View
            style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center"
            }}
        >
            <Text>
                {`Is online: ${online}`}
            </Text>
        </View>
    );
}

export default App;
```

## Custom usage

```typescript
import React from "react";
import {
    View,
    Text
} from "react-native";
import useOnline from "react-native-useonline";

const App = () => {
    const online = useOnline({ url: "https://duckduckgo.com", pingInterval: 600000 });

    return (
        <View
            style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center"
            }}
        >
            <Text>
                {`Is online: ${online}`}
            </Text>
        </View>
    );
}

export default App;
```

## Hook

#### Arguments
- options: ```IOptions { url: string, pingInterval: number }```
<br>
``` url ``` defaults to https://google.com
<br>
``` pingInterval ``` defaults to 30000 milliseconds

#### Returns

The hook returns a boolean or null.
<br>
```[true | false | null]```
