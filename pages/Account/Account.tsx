import { useState, useEffect } from 'react';
import { supabase } from '../supabase';
import { Session } from '@supabase/supabase-js';

export default function Account({ session }: { session: Session }) {
  const [loading, setLoading] = useState(true);
  const [username, setUsername] = useState('');
  const [website, setWebsite] = useState('');
  const [avatarUrl, setAvatarUrl] = useState('');

  useEffect(() => {
    if (session) getProfile();
  }, [session]);

  async function getProfile() {
    try {
      setLoading(true);
      if (!session?.user) throw new Error('No user on the session!');

      let { data, error, status } = await supabase
        .from('profiles')
        .select(`username, website, avatar_url`)
        .eq('id', session?.user.id)
        .single();
      if (error && status !== 406) {
        throw error;
      }

      if (data) {
        setUsername(data.username);
        setWebsite(data.website);
        setAvatarUrl(data.avatar_url);
      }
    } catch (error) {
      if (error instanceof Error) {
        alert(error.message);
      }
    } finally {
      setLoading(false);
    }
  }

  async function updateProfile({
    username,
    website,
    avatar_url,
  }: {
    username: string;
    website: string;
    avatar_url: string;
  }) {
    try {
      setLoading(true);
      if (!session?.user) throw new Error('No user on the session!');

      const updates = {
        id: session?.user.id,
        username,
        website,
        avatar_url,
        updated_at: new Date(),
      };

      let { error } = await supabase.from('profiles').upsert(updates);

      if (error) {
        throw error;
      }
    } catch (error) {
      if (error instanceof Error) {
        alert(error.message);
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <div style={{  marginTop: 40,
        padding: 12,}}>
      <div
        style={{
          paddingTop: 4,
          paddingBottom: 4,
          alignSelf: 'stretch',
          marginTop: 20,
        }}
      >
        <input value={session?.user?.email} disabled />
      </div>
      <div
        style={{
          paddingTop: 4,
          paddingBottom: 4,
          alignSelf: 'stretch',
        }}
      >
        <input
          value={username || ''}
          onChange={(event) => setUsername(event.target.value)}
        />
      </div>
      <div
        style={{
          paddingTop: 4,
          paddingBottom: 4,
          alignSelf: 'stretch',
        }}
      >
        <input
          value={website || ''}
          onChange={(event) => setWebsite(event.target.value)}
        />
      </div>

      <div
        style={{
          paddingTop: 4,
          paddingBottom: 4,
          alignSelf: 'stretch',
          marginTop: 20,
        }}
      >
        <button
          disabled={loading}
          onClick={() => updateProfile({ username, website, avatar_url: avatarUrl })}
        >
          {loading ? 'Loading ...' : 'Update'}
        </button>
      </div>

      <div
        style={{
          paddingTop: 4,
          paddingBottom: 4,
          alignSelf: 'stretch',
        }}
      >
        <button onClick={() => supabase.auth.signOut()}>Sign Out</button>
      </div>
    </div>
  );
}