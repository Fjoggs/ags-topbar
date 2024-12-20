import re
import subprocess
import sys


def get_stats(name: str):
    result = subprocess.run(["xprop", "-root", name], capture_output=True).stdout
    result = result.__str__().replace(name, "").replace("(UTF8_STRING)", "")
    numbers = re.findall(r"\d+", result)
    return numbers


def get_workspace_list():
    num_of_desktops = int(get_stats("_NET_NUMBER_OF_DESKTOPS").pop())
    names = get_stats("_NET_DESKTOP_NAMES")
    desktop_mapping = []
    for index in range(num_of_desktops):
        desktop_mapping.append(names[index])

    return desktop_mapping


def get_current_active_workspace_name():
    desktop_mapping = get_workspace_list()
    current = int(get_stats("_NET_CURRENT_DESKTOP").pop())

    return desktop_mapping[current]


if __name__ == "__main__":
    args = sys.argv
    if args.__len__() < 2:
        print("Command missing. One of: 'list-workspaces' and 'current'")
        exit()

    match sys.argv[1]:
        case "list-workspaces":
            while True:
                print(get_workspace_list())
        case "current":
            print(get_current_active_workspace_name())
            exit()
