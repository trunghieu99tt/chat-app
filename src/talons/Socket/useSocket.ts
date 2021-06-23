import { useEffect, useRef } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { connectedUsersState, userState } from "../../states/user.state";
import { Socket } from "./socket";
import { channelState } from "../../states/room.state";

const useSocket = () => {
    const socketInstance = useRef(null);
    const setConnectedUsers = useSetRecoilState(connectedUsersState);
    const setChannels = useSetRecoilState(channelState);
    const user = useRecoilValue(userState);

    useEffect(() => {
        const socket = new Socket().socket;
        socketInstance.current = socket;
        init();
    }, [])

    const init = () => {
        const socket = (socketInstance.current as any);
        socket.on('connect', () => {
            // console.log('Connected')
        })

        socket.on('users', (res: any) => {
            setConnectedUsers(res);
        });
        socket.on('rooms', (res: any) => {
            setChannels(res);
        })
        socket.on('createRoom', (res: any) => {
        })
    }

    const createChannel = (channel: any) => {
        const username = user?.username;
        if (username) {
            (socketInstance.current as any).emit('createRoom', { channel, username });
        }
    }

    const addMessage = (message: any, roomID: string, file: string | null = null) => {
        const username = user?.username;
        if (username) {
            (socketInstance.current as any).emit("addMessage", {
                username,
                content: message,
                roomID,
                file
            });
        } else {

        }


    }

    // const getConnectedUsers = () => {
    //     try {
    //         (socketInstance.current! as any).on('users', (res: any) => {
    //             setConnectedUsers(res);
    //         })
    //     } catch (error) {
    //         toast.error("Socket disconnected");
    //     }
    // }

    // const getChannels = () => {
    //     console.log(`socketInstance.current`, socketInstance.current);
    //     try {
    //         (socketInstance.current! as any).on('rooms', (res: any) => {
    //             console.log(`res`, res)
    //             setChannels(res);
    //         })
    //     } catch (error) {
    //         toast.error("Socket disconnected");
    //     }
    // }

    return {
        addMessage,
        createChannel
    }

}

export { useSocket };