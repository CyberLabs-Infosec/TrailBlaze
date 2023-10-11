from random import randint

flag = "**********************"
alphabet = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789_{.}'


def weird_func(plain_text, n):
    cipher_text = ""
    for k in range(len(plain_text)):
        position = alphabet.find(plain_text[k])
        cipher_text = cipher_text + alphabet[(position + n) % len(alphabet)]
    return cipher_text


if __name__ == "__main__":
    cipher = ""
    rot = randint(0, 25)

    for i in range(0, len(flag), 4):
        plain = flag[i: i + 4]
        cipher += weird_func(plain, rot)
        rot += 2

    print("What gibberish is this?", cipher)

