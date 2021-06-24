import { useEffect, useRef } from "react";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
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
    }

    const createChannel = (channel: any) => {
        const username = user?.username;
        if (username) {
            (socketInstance.current as any).emit('createRoom', { channel, username });
        }
    }

    const addMessage = (message: string, roomID: string, file: string | null = null) => {
        const username = user?.username;
        if (username) {
            (socketInstance.current as any).emit("addMessage", {
                username,
                content: message,
                roomID,
                file
            });
        }
    }

    const joinRoom = (roomID: string) => {
        const username = user?.username;
        if (username) {
            (socketInstance.current as any).emit("joinRoom", {
                username,
                roomID,
            });
        }
    }

    const updateChannel = (channel: any) => {
        const username = user?.username;
        if (username) {
            (socketInstance.current as any).emit('updateRoom', { channel, username });
        }
    }


    return {
        addMessage,
        joinRoom,
        createChannel,
        updateChannel
    }

}

export { useSocket };