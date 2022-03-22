import React, {
	useState,
	useEffect
} from "react";
import useAppState from "react-native-useappstate";
import NetInfo, {
	NetInfoState
} from "@react-native-community/netinfo";

export interface IOptions {
	url?: string;
	/**
	 * Time in milliseconds.
	 */
	pingInterval?: number;
}

const index = (options?: IOptions) => {
	const [isOnline, setIsOnline] = useState<boolean | null>(null);
	const [url, setUrl] = useState<string>("https://google.com");

	const appState = useAppState();

	const getOnlineStatus = async () => {
		try {
			const res = await fetch(url);
			return res.status === 200;
		}
		catch {
			return false;
		}
	};

	const onNetInfoChange = async (state: NetInfoState) => {
		setIsOnline(await getOnlineStatus());
	};

	useEffect(() => {
		async () => {
			setIsOnline(await getOnlineStatus());
		};
	}, [appState]);

	useEffect(() => {
		let pingInterval = 30000;
		if (options?.pingInterval)
			pingInterval = options?.pingInterval;

		const interval = setInterval(async () => {
			setIsOnline(await getOnlineStatus());
		}, pingInterval);
		const unsubscribe = NetInfo.addEventListener(onNetInfoChange);

		return () => {
			clearInterval(interval);
			unsubscribe();
		};
	}, [url, options?.pingInterval]);

	useEffect(() => {
		if (options?.url) {
			setUrl(options?.url);
		}
	}, [options?.url]);

	return isOnline;
};

export default index;
