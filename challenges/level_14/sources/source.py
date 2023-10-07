from random import randint

f = open("flag.txt", "rb")
flag = f.read()

alphabet = 'abcdefghijklmnopqrstuvwxyz0123456789_{}'


def weird_func(pt, n):
    ct = ''
    for k in range(len(pt)):
        pos = alphabet.find(pt[k])
        ct = ct + alphabet[(pos + n) % len(alphabet)]
    return ct


cipher = ''
rot = randint(0, 25)
print(rot)
for i in range(0, len(flag), 4):
    plain = flag[i:i + 4].decode()
    cipher += weird_func(plain, rot)
    rot += 2

print("What gibberish is this?", cipher)