// Banco de Dados das Músicas
        const musicLibrary = {
            pop: {
                nome: "Pop",
                img: "https://npr.brightspotcdn.com/dims4/default/b917a77/2147483647/strip/true/crop/900x506+0+75/resize/1200x675!/quality/90/?url=http%3A%2F%2Fnpr-brightspot.s3.amazonaws.com%2F78%2Fe7%2Fd5f5d7004813b86a597078393f2f%2Fphoto-1507676184212-d03ab07a01bf-copy.jpg", 
                artistas: {
                    "Michael Jackson": {
                        img: "https://wallpapercat.com/w/full/1/3/3/224866-1787x2560-samsung-hd-michael-jackson-wallpaper-image.jpg",
                        musicas: [
                            {
                                titulo: "Heaven Can Wait",
                                yt: "TDVlDUAIz5k",
                                letra: "Tell the {angels} no, I don't wanna leave my baby {alone} <br> I don't want {nobody} else to hold you <br> That's a {chance} I'll take, baby I'll stay, Heaven can {wait} <br> No, if the angels took me from this {earth} <br> I would tell them bring me back to {her} <br><br> And if they won't let me {go}, I'll just have to say <br> Heaven can {wait} <br> 'Cause I don't wanna leave you {behind} <br> Heaven can {wait} <br> 'Cause I'm not ready to say {goodbye} <br> Leave you behind, you're my {everything} <br> You're my everything, heaven can {wait}"
                            },
                            {
                                titulo: "Billie Jean",
                                yt: "Zi_XLOBDo_Y",
                                letra: "She was more like a {beauty} queen from a movie scene <br> I said don't mind, but what do you {mean}, I am the one <br> Who will {dance} on the floor in the round <br> She said I am the {one}, who will dance on the floor in the {round} <br><br> She told me her name was Billie Jean, as she caused a {scene} <br> Then every {head} turned with eyes that dreamed of being the one <br> Who will {dance} on the floor in the round <br><br> People always told me be {careful} of what you do <br> And don't go around breaking young girls' {hearts} <br> And mother always told me be careful of who you {love} <br> And be careful of what you {do} 'cause the lie becomes the truth <br><br> Billie Jean is not my {lover} <br> She's just a {girl} who claims that I am the one <br> But the {kid} is not my son"
                            },
                            {
                                titulo: "Love Never Felt So Good",
                                yt: "0wnuTGGuAVs",
                                letra: "Baby, {love} never felt so good <br> And I'd {die} if it ever could <br> Not like you hold me, {hold} me <br> Oh baby, love never felt so {fine} <br> And I'd {die} if it's never mine <br> Not like you hold me, {hold} me <br><br> And the {night} is gonna be just fine <br> Gotta {fly}, gotta see, can't believe <br> I can't take it 'cause <br> Baby, every time I {love} you, in and out of my life, in out baby <br> Tell me, if you {really} love me, it's in and out my life, driving me {crazy} <br> 'Cause baby, {love} never felt so good"
                            }
                        ]
                    },
                    "The Weeknd": {
                        img: "https://4kwallpapers.com/images/wallpapers/the-weeknd-canadian-1080x1920-9582.jpg",
                        musicas: [
                            {
                                titulo: "Blinding Lights",
                                yt: "fHI8X4OXluQ",
                                letra: "I've been on my {own} for long enough <br> Maybe you can {show} me how to love, maybe <br> I'm going through {withdrawals} <br> You don't even have to do too {much} <br> You can turn me {on} with just a touch, baby <br><br> I look around and Sin City's {cold} and empty (oh) <br> No one's around to {judge} me (oh) <br> I can't see clearly when you're {gone} <br><br> I said, ooh, I'm {blinded} by the lights <br> No, I can't sleep until I feel your {touch} <br> I said, ooh, I'm drowning in the {night} <br> Oh, when I'm like this, you're the {one} I trust"
                            },
                            {
                                titulo: "Save Your Tears",
                                yt: "XXYlFuWEuKI",
                                letra: "I saw you {dancing} in a crowded room <br> You look so {happy} when I'm not with you <br> But then you saw me, caught you by {surprise} <br> A single teardrop falling from your {eye} <br><br> I don't know why I run {away} <br> I'll make you {cry} when I run away <br> You could've asked me why I {broke} your heart <br> You could've told me that you fell {apart} <br> But you walked past me like I wasn't {there} <br> And just pretended like you didn't {care} <br><br> Take me {back} 'cause I wanna stay <br> Save your {tears} for another day"
                            }
                        ]
                    },
                    "Bruno Mars": {
                        img: "https://w0.peakpx.com/wallpaper/432/280/HD-wallpaper-bruno-mars-choreographer-musician-producer-singer.jpg",
                        musicas: [
                            {
                                titulo: "Just The Way You Are",
                                yt: "LjhCEhWiKXk",
                                letra: "Oh, her {eyes}, her eyes <br> Make the {stars} look like they're not shinin' <br> Her {hair}, her hair <br> Falls perfectly without her {trying} <br> She's so {beautiful} and I tell her every {day} <br><br> Yeah, I {know}, I know <br> When I compliment her, she won't {believe} me <br> And it's so, it's so <br> Sad to {think} that she don't see what I {see} <br> But every time she {asks} me, 'Do I look {okay}?' <br> I {say} <br><br> When I see your {face} <br> There's not a {thing} that I would change <br> 'Cause you're {amazing} <br> Just the {way} you are <br> And when you {smile} <br> The whole {world} stops and stares for a {while}"
                            },
                            {
                                titulo: "The Lazy Song",
                                yt: "fLexgOxsZu0",
                                letra: "Today I don't feel like doing {anything} <br> I just wanna lay in my {bed} <br> Don't feel like picking up my {phone} <br> So leave a message at the {tone} <br> 'Cause today I swear I'm not doing {anything} <br><br> I'm gonna kick my {feet} up, then stare at the fan <br> Turn the TV on, throw my {hand} in my pants <br> Nobody's gonna tell me I {can't} <br><br> I'll be lounging on the {couch}, just chillin' in my snuggie <br> Click to MTV, so they can {teach} me how to dougie <br> 'Cause in my castle I'm the freaking {man} <br><br> Oh, yes I said it <br> I said it, I {said} it 'cause I can"
                            },
                            {
                                titulo: "When I Was Your Man",
                                yt: "ekzHIouo8Q4",
                                letra: "Same bed but it feels just a little bit {bigger} now <br> Our song on the radio but it don't sound the {same} <br> When our {friends} talk about you, all it does is just tear me {down} <br> 'Cause my {heart} breaks a little when I hear your {name} <br><br> It all just sounds like ooh, ooh, ooh, hoo <br> Mm, too {young}, too dumb to realize <br> That I should have bought you {flowers} <br> And held your {hand} <br> Should have gave you all my {hours} <br> When I had the {chance} <br> Take you to every {party} 'cause all you wanted to do was {dance} <br><br> Now my {baby} is dancing <br> But she's dancing with another {man}"
                            }
                        ]
                    },
                    "Ed Sheeran": {
                        img: "",
                        musicas: [
                            { 
                                titulo: "Perfect", 
                                yt: "2Vv-BfVoq4g",
                                letra: "I found a {love} for {me} <br> Darling, just {dive} right in and follow my {lead} <br> Well, I found a {girl}, beautiful and {sweet} <br> Oh, I never {knew} you were the someone waiting for {me} <br><br> 'Cause we were just kids when we {fell} in love <br> Not knowing what it {was} <br> I will not {give} you up this {time} <br> But darling, just {kiss} me slow, your heart is all I {own} <br> And in your {eyes}, you're holding mine <br><br> Baby, I'm {dancing} in the {dark} with you between my {arms} <br> Barefoot on the {grass}, listening to our favorite {song} <br> When you said you looked a {mess}, I whispered underneath my {breath} <br> But you {heard} it, darling, you look {perfect} tonight"
                            },
                            { 
                                titulo: "Thinking Out Loud", 
                                yt: "WpyfrixXBqU",
                                letra: "When your {legs} don't work like they used to {before} <br> And I can't sweep you off of your {feet} <br> Will your mouth still {remember} the taste of my {love}? <br> Will your {eyes} still smile from your cheeks? <br><br> And darling I will be {loving} you 'til we're {seventy} <br> And baby my {heart} could still fall as {hard} at twenty-three <br> And I'm thinking 'bout how {people} fall in love in mysterious {ways} <br> Maybe just the touch of a {hand} <br> Oh me I fall in {love} with you every single {day} <br> And I just wanna {tell} you I am <br><br> So honey now <br> Take me into your loving {arms} <br> Kiss me under the light of a thousand {stars} <br> Place your {head} on my beating {heart} <br> I'm thinking out {loud} <br> Maybe we found {love} right where we {are}" 
                            }
                        ]
                    },
                    "Adele": {
                        img: "https://i.pinimg.com/474x/b9/7d/bb/b97dbb0c48f4580202cb02b2d75b3127.jpg",
                        musicas: [
                            {
                                titulo: "Someone Like You",
                                yt: "hLQl3WQQoQ0",
                                letra: "I heard that you're {settled} down <br> That you found a {girl} and you're {married} now <br> I heard that your {dreams} came true <br> Guess she gave you {things} I didn't give to {you} <br><br> Old {friend}, why are you so shy? <br> Ain't like you to hold {back} or hide from the {light} <br> I hate to turn up out of the {blue}, uninvited <br> But I couldn't stay {away}, I couldn't fight it <br> I had hoped you'd see my {face} and that you'd be reminded <br> That for {me}, it isn't {over} <br><br> Never mind, I'll find {someone} like you <br> I wish nothing but the {best} for you, too <br> Don't {forget} me, I beg <br> I {remember} you said <br> Sometimes it lasts in {love}, but sometimes it hurts {instead}"
                            }
                        ]
                    }
                }
            },
            rock: {
                nome: "Rock",
                img: "https://images.unsplash.com/photo-1498038432885-c6f3f1b912ee?w=500",
                artistas: {
                    "Bon Jovi": {
                        img: "https://i.pinimg.com/474x/c7/00/2f/c7002f16a6b300a2d81083eca8b3feca.jpg",
                        musicas: [
                            {
                                titulo: "Livin' On A Prayer",
                                yt: "lDK9QqIzhwk",
                                letra: "Tommy used to work on the {docks}, union's been on strike <br> He's down on his {luck}, it's tough, so tough <br> Gina works the diner all {day} <br> Working for her man, she brings home her {pay}, for love, for love <br><br> She says, we've got to hold on to what we've {got} <br> It doesn't make a difference if we make it or {not} <br> We've got each {other} and that's a lot for love <br> We'll give it a {shot} <br><br> Woah, we're {halfway} there <br> Woah, livin' on a {prayer} <br> Take my {hand}, we'll make it I swear <br> Woah, livin' on a {prayer}"
                            },
                            {
                                titulo: "It's My Life",
                                yt: "vx2u5uUu3DE",
                                letra: "This ain't a song for the {broken-hearted} <br> No silent prayer for the faith-departed <br> I ain't gonna be just a {face} in the crowd <br> You're gonna hear my {voice} when I shout it out loud <br><br> It's my {life} <br> It's now or {never} <br> I ain't gonna live {forever} <br> I just want to {live} while I'm alive <br><br> My {heart} is like an open highway <br> Like Frankie said, I did it my {way} <br> I just wanna {live} while I'm alive <br> It's my {life}"
                            }
                        ]
                    },
                    "Guns N' Roses": {
                        img: "https://i.pinimg.com/474x/81/7d/e7/817de7db4fec9b2864960c7c4b5dfc92.jpg",
                        musicas: [
                            {
                                titulo: "November Rain",
                                yt: "8SbUC-UaAxE",
                                letra: "When I look into your {eyes} <br> I can see a love {restrained} <br> But darlin' when I {hold} you <br> Don't you know I feel the {same}? <br><br> 'Cause nothin' lasts {forever} <br> And we both know hearts can {change} <br> And it's hard to hold a {candle} <br> In the cold November {rain} <br><br> We've been through this such a long long {time} <br> Just tryin' to kill the {pain}, oh yeah <br> But lovers always come and lovers always {go} <br> And no one's really {sure} who's lettin' go today <br> Walking {away}"
                            }
                        ]
                    },
                    "John Lennon": {
                        img: "https://getwallpapers.com/wallpaper/full/b/0/3/293244.jpg",
                        musicas: [
                            {
                                titulo: "Imagine",
                                yt: "VOgFZfRVaww",
                                letra: "Imagine there's no {heaven} <br> It's {easy} if you try <br> No {hell} below us <br> Above us, only {sky} <br> Imagine all the {people} <br> Living for {today} <br><br> Imagine there's no {countries} <br> It isn't hard to {do} <br> Nothing to {kill} or die for <br> And no religion, {too} <br> Imagine all the {people} <br> Living life in {peace} <br><br> You may {say} I'm a dreamer <br> But I'm not the {only} one <br> I hope someday you'll {join} us <br> And the {world} will be as one"
                            }
                        ]
                    },
                    "The Beatles": {
                        img: "https://wallpapercat.com/w/full/6/3/8/187461-1080x2220-iphone-hd-the-beatles-wallpaper-image.jpg",
                        musicas: [
                            {
                                titulo: "Let It Be",
                                yt: "CGj85pVzRJs",
                                letra: "When I find myself in {times} of trouble <br> Mother Mary comes to {me} <br> Speaking words of {wisdom} <br> Let it {be} <br><br> And in my hour of {darkness} <br> She is standing right in {front} of me <br> Speaking {words} of wisdom <br> Let it {be} <br><br> Let it be, let it {be} <br> Let it be, let it {be} <br> Whisper words of {wisdom} <br> Let it {be} <br><br> And when the broken-hearted {people} <br> Living in the {world} agree <br> There will be an {answer} <br> Let it {be}"
                            }
                        ]
                    },
                    "Queen": {
                        img: "https://w0.peakpx.com/wallpaper/742/403/HD-wallpaper-freddie-mercury-leyenda-queen-rock-rock-internacional.jpg",
                        musicas: [
                            {
                                titulo: "Love of My Life",
                                yt: "v4HZPHqt3mo",
                                letra: "Love of my {life}, you've hurt {me} <br> You've broken my {heart} and now you leave me <br> Love of my {life}, can't you {see}? <br><br> Bring it {back}, bring it {back} <br> Don't {take} it away from me <br> Because you don't {know} <br> What it means to {me} <br><br> Love of my {life}, don't leave {me} <br> You've taken my {love}, you now desert me <br> Love of my {life}, can't you {see}? <br><br> Bring it {back}, bring it {back} <br> Don't {take} it away from me <br> Because you don't {know} <br> What it means to {me}"
                            }
                        ]
                    }
                }
            }
        };
