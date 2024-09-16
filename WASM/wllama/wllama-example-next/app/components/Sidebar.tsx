import { useMessages } from '../contexts/messages.context';
import { Screen } from '../utils/types';
import { useWllama } from '../contexts/wllama.context';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faBrain,
  faArrowUpRightFromSquare,
  faQuestionCircle,
  faTrashAlt,
  faBug,
} from '@fortawesome/free-solid-svg-icons';

export default function Sidebar({ children }: { children: any }) {
  const { currentConvId, navigateTo, currScreen, currModel } = useWllama();
  const { conversations, getConversationById, deleteConversation } =
    useMessages();

  const currConv = getConversationById(currentConvId);

  return (
    <>
      <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />

      <div className="drawer-side h-screen lg:h-[calc(100vh-4rem)] z-50">
        <label
          htmlFor="my-drawer-2"
          aria-label="close sidebar"
          className="drawer-overlay block lg:hidden"
        ></label>

        <div className="h-screen lg:max-h-[calc(100vh-4rem)] flex flex-col text-base-content bg-base-200">
          <div className="grow w-80 overflow-auto p-4">
            <ul className="grow menu gap-1">
              <li onClick={() => navigateTo(Screen.CHAT)}>
                <a
                  className={
                    !currConv && currScreen === Screen.CHAT ? 'active' : ''
                  }
                >
                  + New conversation
                </a>
              </li>
              {conversations.map((conv) => (
                <li
                  key={conv.id}
                  onClick={() => navigateTo(Screen.CHAT, conv.id)}
                >
                  <a
                    className={`group ${conv.id === currentConvId ? 'active' : ''}`}
                  >
                    {conv.messages[0]?.content}
                    <span className="text-right hidden group-hover:inline cursor-pointer">
                      <FontAwesomeIcon
                        icon={faTrashAlt}
                        onClick={(e) => {
                          e.preventDefault();
                          if (
                            confirm('Are you sure to delete this conversation?')
                          ) {
                            navigateTo(Screen.CHAT);
                            deleteConversation(conv.id);
                          }
                        }}
                      />
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="w-80 px-4 pt-0 pb-8">
            <div className="divider my-2"></div>

            {currModel && (
              <div className="text-sm px-4 pb-2">Model: {currModel.name}</div>
            )}

            <ul className="menu gap-1">
              <li onClick={() => navigateTo(Screen.GUIDE)}>
                <a className={currScreen === Screen.GUIDE ? 'active' : ''}>
                  <FontAwesomeIcon icon={faQuestionCircle} /> Guide
                </a>
              </li>
              <li onClick={() => navigateTo(Screen.MODEL)}>
                <a className={currScreen === Screen.MODEL ? 'active' : ''}>
                  <FontAwesomeIcon icon={faBrain} /> Manage models
                </a>
              </li>
              <li onClick={() => navigateTo(Screen.LOG)}>
                <a className={currScreen === Screen.LOG ? 'active' : ''}>
                  <FontAwesomeIcon icon={faBug} /> Debug log
                </a>
              </li>
              <li>
                <a
                  href="https://github.com/ngxson/wllama"
                  target="_blank"
                  rel="noopener"
                >
                  <FontAwesomeIcon icon={faArrowUpRightFromSquare} /> Github
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="drawer-content grow">{children}</div>
    </>
  );
}
